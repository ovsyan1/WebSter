import axios from "axios";
import { DataTypeSignUp, DataTypeLogin } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_URL = "http://api.printapp.store/";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

instance.interceptors.response.use((config: any) => {
  console.log('config', config)
    return config;
}, (async (error) => {
    const originalRequest = error.config;
    console.log(error.config)
    if(error.response.status === 401 && error.config && !error.config._isRetry){
      originalRequest._isRetry = true;
        try{
            const response = await instance.get('/api/auth/refresh');
            console.log('response', response)
            localStorage.setItem("token", response.data?.data?.accessToken);
            return instance.request(originalRequest);
        }catch(err){
            console.log('not permission', err);
        };
    }
    throw error;
}));

export const signUpUser = async (data: DataTypeSignUp) => {
  return await instance
    .post("api/auth/register", data)
    .then((res) => {
      localStorage.setItem("token", res.data?.data?.accessToken);
      return res.data;
    })
    .catch((err) => err);
};

export const loginRequest = async (data: DataTypeLogin) => {
  return await instance
    .post("api/auth/login", data)
    .then((res) => {
      localStorage.setItem("token", res.data?.data?.accessToken);
      return res.data;
    })
    .catch((err) => err);
};

export const logOutRequest = async () => {
  return instance.post("api/auth/logout");
};

export const userDataRequest = createAsyncThunk(
  "user/userDataRequest",
  async () => {
    return instance
      .get("api/auth/user")
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const usersRequest = createAsyncThunk(
  "users/usersRequest",
  async () => {
    return instance
        .get("/api/auth/users")
        .then((res) => res.data)
        .catch(err => err);
  }
);

export const savePhoto = createAsyncThunk(
  "photo/savePhoto",
  async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    return instance
        .post("/api/photo", formData)
        .then(res => res.data)
        .catch(err => err);
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async () => {
    return instance.post('api/order')
            .then(res => res.data)
            .catch(err => err);
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async () => {
    return instance.get('api/order')
            .then(res => res.data)
            .catch(err => err);
  }
);

export const getImages = async () => {
    return instance.get('api/photo')
        .then(res => res.data)
        .catch(err => err);
}

export const postSizes = async (data: { name: string, width: number, height: number }) => {
  return instance.post('api/size', data)
        .then(res => res.data)
        .catch(err => err);
};

export const getSizes = createAsyncThunk(
  'sizes/getSizes',
  async () => {
    return instance.get('api/size')
          .then(res => res.data)
          .catch(err => err);
  }
);
export const postPapers = async (data: { name: string, size: string, typePaper: string, density: number }) => {
  return instance.post('api/size', data)
        .then(res => res.data)
        .catch(err => err);
};

export const getPapers = async () => {
  return instance.get('api/paper')
      .then(res => res.data)
      .catch(err => err);
}

