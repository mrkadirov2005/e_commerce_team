import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCarts } from "./thunks/fetchAllCarts";
import { addNewCart } from "./thunks/addNewCart";
import { getSingleCart } from "./thunks/getSingleCart";
import { updateSingleCart } from "./thunks/updateSingleCart";
import { DELETESINGLEPRODUCT } from "./thunks/deleteSingleProduct";

const initialState = {
  carts: [],
  singleCart: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ✅ fetchAllCarts
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
      });

    // ✅ addNewCart
    builder
      .addCase(addNewCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts.push(action.payload);
      })
      .addCase(addNewCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ getSingleCart
    builder
      .addCase(getSingleCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleCart = action.payload;
      })
      .addCase(getSingleCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ updateSingleCart
    builder
      .addCase(updateSingleCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSingleCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.carts.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.carts[index] = action.payload;
        }
        if (state.singleCart?.id === action.payload.id) {
          state.singleCart = action.payload;
        }
      })
      .addCase(updateSingleCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ delete cart
    builder
      .addCase(DELETESINGLEPRODUCT.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DELETESINGLEPRODUCT.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = state.carts.filter((c) => c.id !== action.payload.id);
        if (state.singleCart?.id === action.payload.id) {
          state.singleCart = null;
        }
      })
      .addCase(DELETESINGLEPRODUCT.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartsSlice.reducer;
