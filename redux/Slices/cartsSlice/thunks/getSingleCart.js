import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSingleCart = createAsyncThunk(
  "carts/getSingleCart",
  async (id) => {
    const res = await fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to get cart");
    }

    const data = await res.json();
    return data; // newly got cart will be available in extraReducers
  }
);
