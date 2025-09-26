// https://fakestoreapi.com/products/{id}
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch single product");
    }

    const data = await response.json();
    return data; // this will be available in extraReducers
  }
);
