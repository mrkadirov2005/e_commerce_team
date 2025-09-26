import { createAsyncThunk } from "@reduxjs/toolkit";

export const DELETESINGLEPRODUCT = createAsyncThunk(
  "carts/DELETESINGLEPRODUCT",
  async (id) => {
    const res = await fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to add cart");
    }

    const data = await res.json();
    return data; // newly created cart will be available in extraReducers
  }
);
