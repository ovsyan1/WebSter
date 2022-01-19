import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from 'react-router-dom';

import Welcome from '../modules/Welcome';
import About from '../modules/About';
import NotFound from '../modules/NotFound';
import ListItems from '../modules/ListItems';
import SignUp from '../modules/SignUp';
import Login from '../modules/Login';
import ForgetPassword from '../modules/ForgetPassword';
import MainPage from '../modules/MainPage';
import Templates from '../modules/Templates';
import Settings from '../modules/Settings';
import Repository from '../modules/Repository';
import Orders from '../modules/Orders';
import Map from '../modules/Map';
import History from '../modules/History';
import UsersImages from '../modules/UsersImages';
import Admin from "../modules/Admin";
import { useDispatch } from 'react-redux';
import { userDataRequest } from '../api';


const Routesss: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userDataRequest());
  }, [])
    return (
      <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/list-items" element={<ListItems />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/templates" element={<Templates />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/repository" element={<Repository />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/users-images" element={<UsersImages />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/users" element={<Admin />}></Route>
          <Route path="/admin/services" element={<Admin />}></Route>
          <Route path="/admin/orders" element={<Admin />}></Route>
          <Route path="/admin/photos" element={<Admin />}></Route>
          <Route path="/admin/papers" element={<Admin />}></Route>
          <Route path="/admin/sizes" element={<Admin />}></Route>
          <Route path="/admin/types" element={<Admin />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>  
    ) 
};
  
  export default Routesss;