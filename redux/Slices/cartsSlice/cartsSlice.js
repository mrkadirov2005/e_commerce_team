import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCarts } from "./thunks/fetchAllCarts";
import { addNewCart } from "./thunks/addNewCart";

const initialState = {
    carts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCarts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchAllCarts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.carts = action.payload;
            })
            .addCase(fetchAllCarts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(addNewCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addNewCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.carts.push(action.payload); // add new cart to state
            })
            .addCase(addNewCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    },
});

export default cartsSlice.reducer;
