import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateSingleCart = createAsyncThunk(
  "carts/updateSingleCart",
  async (cart) => {
    const res = await fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart), // send cart data here
    });

    if (!res.ok) {
      throw new Error("Failed to update cart");
    }

    const data = await res.json();
    return data; // newly updated cart will be available in extraReducers
  }
);
