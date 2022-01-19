import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from '../api';
import { OrdersType } from '../types';

const initialState: OrdersType = {
  ordersResponse: null,
  status: '',
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(getOrders.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.ordersResponse = payload;
        });
        builder.addCase(getOrders.rejected, (state) => {
            state.status = 'some error ocurred';
        })
    },
  });

export default ordersSlice.reducer;