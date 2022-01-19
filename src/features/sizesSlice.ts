import { createSlice } from '@reduxjs/toolkit';
import { getSizes } from '../api';

const initialState = {
  sizesResponse: null,
  status: '',
};

export const sizesSlice = createSlice({
    name: 'sizes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSizes.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(getSizes.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.sizesResponse = payload;
        });
        builder.addCase(getSizes.rejected, (state) => {
            state.status = 'some error ocurred';
        })
    },
  });

export default sizesSlice.reducer;