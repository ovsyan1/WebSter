import { combineReducers } from '@reduxjs/toolkit';
import photoSlice from '../features/photoSlice';
import userSlice from '../features/userSlice';
import ordersSlice from '../features/ordersSlice';
import orderSlice from '../features/orderSlice';
import sizesSlice from '../features/sizesSlice';

const rootReducer = combineReducers({
    photo: photoSlice,
    user: userSlice,
    orders: ordersSlice,
    order: orderSlice,
    sizes: sizesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;