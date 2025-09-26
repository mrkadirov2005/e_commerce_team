<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./thunks/getAllProductsThunk";
import { addSingleProduct } from "./thunks/addSingleProductSlice";
=======
import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './thunks/getAllProductsThunk'
>>>>>>> 2af6a42 (Add cart functionality, product detail pages, and routing system)

const initialState = {
  value: 0,
  products: [],
<<<<<<< HEAD
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
=======
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Export actions for use in components
// export const {  } = productsSlice.actions

export default productsSlice.reducer
>>>>>>> 2af6a42 (Add cart functionality, product detail pages, and routing system)
