import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./thunks/getAllProductsThunk";
import { addSingleProduct } from "./thunks/addSingleProduct";
import { getSingleProduct } from "./thunks/getSingleProduct";
import { updateSingleProduct } from "./thunks/updateSingleProduct";
import { deleteSingleProductById } from "./thunks/deleteSingleProduct";

const initialState = {
  value: 0,
  products: [],
  singleProduct: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ✅ fetchProducts
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

    // ✅ addSingleProduct
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

    // ✅ getSingleProduct
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ updateSingleProduct
    builder
      .addCase(updateSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.singleProduct?.id === action.payload.id) {
          state.singleProduct = action.payload;
        }
      })
      .addCase(updateSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ deleteSingleProductById
    builder
      .addCase(deleteSingleProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSingleProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter((p) => p.id !== action.payload.id);
        if (state.singleProduct?.id === action.payload.id) {
          state.singleProduct = null;
        }
      })
      .addCase(deleteSingleProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
