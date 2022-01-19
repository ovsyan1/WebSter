import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";

import {
    LinkWrapper,
} from "../../styles";


interface PropsAdminMenuItemType {
    path: string;
    text: string;
}

const AdminMenuItem: React.FC<PropsAdminMenuItemType> = ({path, text}) => {

    const { pathname }  = useLocation();

    return (
        <LinkWrapper to={path}>
            <MenuItem selected={pathname === path}>{text}</MenuItem>
        </LinkWrapper>
    )
}

export default AdminMenuItem;