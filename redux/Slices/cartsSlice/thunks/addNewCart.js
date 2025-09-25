import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewCart = createAsyncThunk(
  "carts/addNewCart",
  async (cart) => {
    const res = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart), // send cart data here
    });

    if (!res.ok) {
      throw new Error("Failed to add cart");
    }

    const data = await res.json();
    return data; // newly created cart will be available in extraReducers
  }
);
