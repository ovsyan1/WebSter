import React, {ReactElement} from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";

import {
    LinkWrapper,
} from "../styles";
import AdminMainUsers from "./Users";
import AdminMainDashboard from "./Dashboard/Dashboard";
import AdminMainServices from "./Services";
import AdminMainOrders from "./Orders";
import AdminMainPhotos from "./Photos";
import AdminMainPapers from "./Papers";
import AdminMainSizes from "./Sizes";
import AdminMainTypes from "./Types";


interface PropsAdminMainType {
    path: string;

}

const AdminMain: React.FC<PropsAdminMainType> = ({path }) => {

    const routes = {
        '/'         : <AdminMainDashboard />,
        '/users'    : <AdminMainUsers />,
        '/services' : <AdminMainServices />,
        '/orders'   : <AdminMainOrders />,
        '/photos'   : <AdminMainPhotos />,
        '/papers'   : <AdminMainPapers />,
        '/sizes'    : <AdminMainSizes />,
        '/types'    : <AdminMainTypes />,
    };

    const { pathname }  = useLocation();

    if(pathname !== ('/admin' + path).replace(/\/$/, '')) {
        return (<></>);
    }

    return (
        <>
            {/*<div>{routes[path]}</div>*/}
            { path === '/' && <div>{routes[`/`]}</div>}
            { path === '/users' && <div>{routes[`/users`]}</div>}
            { path === '/services' && <div>{routes[`/services`]}</div>}
            { path === '/orders' && <div>{routes[`/orders`]}</div>}
            { path === '/photos' && <div>{routes[`/photos`]}</div>}
            { path === '/papers' && <div>{routes[`/papers`]}</div>}
            { path === '/sizes' && <div>{routes[`/sizes`]}</div>}
            { path === '/types' && <div>{routes[`/types`]}</div>}
        </>
    )
}

export default AdminMain;