import { createSlice } from '@reduxjs/toolkit';
import { userDataRequest } from '../api';
import { UserSliceType } from '../types';


const initialState: UserSliceType = {
  userData: {},
  status: '',
  isUser: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOutAction: (state) => {
            localStorage.removeItem('token');
            state.userData = {};
            state.isUser = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userDataRequest.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(userDataRequest.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.userData = payload;
            state.isUser = true;
        });
        builder.addCase(userDataRequest.rejected, (state) => {
            state.status = 'some error ocurred';
            state.isUser = false;
        })
    },
  });

  export const {logOutAction} = userSlice.actions;

  export default userSlice.reducer; 