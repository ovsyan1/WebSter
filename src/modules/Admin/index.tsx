import React from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import { Typography } from "@mui/material";

import {
    Aside,
    BodyWrapper,
    Container,
    Heading,
    Main,
} from "./styles";
import AdminMenu from "../../components/Admin/Menu";
import AdminMain from "../../components/Admin/Main";


const Admin: React.FC= () => {
    return (
        <BodyWrapper>
            <Header drawer/>
            <Container>
                <Heading>
                    <Typography variant="h3">Адміністратор сервісу</Typography> 
                </Heading>
                <Aside>
                    <AdminMenu />
                </Aside>
                <Main>
                    <AdminMain path='/'/>
                    <AdminMain path='/users'/>
                    <AdminMain path='/services'/>
                    <AdminMain path='/orders'/>
                    <AdminMain path='/photos'/>
                    <AdminMain path='/papers'/>
                    <AdminMain path='/sizes'/>
                    <AdminMain path='/types'/>
                </Main>
            </Container>
            <Footer />
        </BodyWrapper>
    )
}

export default Admin;