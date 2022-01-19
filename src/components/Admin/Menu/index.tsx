import React, {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';

import AdminMenuItem from "./Item";


const AdminMenu: React.FC= () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <Paper>
            <MenuList>
                <AdminMenuItem path={'/admin'} text={'Головна'} />
                <hr />
                <AdminMenuItem path={'/admin/users'} text={'Користувачі'} />
                <AdminMenuItem path={'/admin/services'} text={'Сервіси друку'} />
                <AdminMenuItem path={'/admin/orders'} text={'Замовлення'} />
                <AdminMenuItem path={'/admin/photos'} text={'Фотографії'} />
                <hr />
                <AdminMenuItem path={'/admin/papers'} text={'Папір'} />
                <AdminMenuItem path={'/admin/sizes'} text={'Розміри'} />
                <AdminMenuItem path={'/admin/types'} text={'Типи фото'} />
                <hr />
                <AdminMenuItem path={'/'} text={'На сайт'} />
            </MenuList>
        </Paper>
    )
}

export default AdminMenu;