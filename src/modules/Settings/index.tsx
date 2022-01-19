import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {BodyWrapper} from "../Welcome/styles";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

const Settings: React.FC = () => {
    const userData = useSelector((state: RootState) => state.user?.userData);
    return (
        <BodyWrapper>
            <Header drawer /> 
            <Typography variant="h2">
                Настройки
            </Typography>
            <div>Your name: {userData ? userData.name : 'please login'}</div>
            <div>Your email: {userData ? userData.email : 'please login'}</div>
            <Link to="/">home</Link>
            <Footer />
        </BodyWrapper>
    )
}

export default Settings;