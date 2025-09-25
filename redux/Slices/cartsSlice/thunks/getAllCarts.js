import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCarts = createAsyncThunk(
  "carts/fetchAllCarts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/carts");
    if (!res.ok) throw new Error("Failed to fetch carts");
    const data = await res.json();
    return data;
  }
);
