import { createSlice } from '@reduxjs/toolkit';
import { PhotoStateType } from '../types';
import { savePhoto } from '../api';


const initialState: PhotoStateType = {
  photoResponse: {},
  status: '',
};

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(savePhoto.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(savePhoto.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.photoResponse = payload;
        });
        builder.addCase(savePhoto.rejected, (state) => {
            state.status = 'some error ocurred';
        })
    },
  });

export default photoSlice.reducer; 
