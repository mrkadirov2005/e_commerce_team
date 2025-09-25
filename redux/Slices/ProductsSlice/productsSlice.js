import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./thunks/getAllProductsThunk";
import { addSingleProduct } from "./thunks/addSingleProductSlice";

const initialState = {
  value: 0,
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // store error messages
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // addSingleProduct
    builder
      .addCase(addSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export reducer
export default productsSlice.reducer;
