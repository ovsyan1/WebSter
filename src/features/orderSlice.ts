import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../api';
import { OrderType } from '../types';

const initialState: OrderType = {
  orderResponse: null,
  status: '',
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.orderResponse = payload;
        });
        builder.addCase(createOrder.rejected, (state) => {
            state.status = 'some error ocurred';
        })
    },
  });

export default orderSlice.reducer;