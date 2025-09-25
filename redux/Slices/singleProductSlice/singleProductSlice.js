import { createSlice } from "@reduxjs/toolkit";
  import { getSingleProduct } from "./thunks/getSingleProduct";
import { updateSingleProduct } from "./thunks/updateSingleProduct";
import { deleteSingleProductById } from "./thunks/deleteSingleProductById";

const initialState = {
  value: 0,
  product: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // store error messages
};

export const singleProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProducts

builder
  .addCase(getSingleProduct.pending, (state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(getSingleProduct.fulfilled, (state, action) => {
    state.status = "succeeded";
    // store it separately or merge into products
    state.product = action.payload; 
  })
  .addCase(getSingleProduct.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  })
    //  update card
  builder
  .addCase(updateSingleProduct.pending, (state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(updateSingleProduct.fulfilled, (state, action) => {
    state.status = "succeeded";
    const updated = action.payload;
    const index = state.products.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      state.product = updated; 
    }
  })
  .addCase(updateSingleProduct.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  })

  builder
  .addCase(deleteSingleProductById.pending, (state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(deleteSingleProductById.fulfilled, (state, action) => {
    state.status = "succeeded";
    const deletedId = action.payload.id;
    state.products = state.products.filter((p) => p.id !== deletedId);
  })
  .addCase(deleteSingleProductById.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  })
  },
});

// Export reducer
export default singleProductSlice.reducer;
