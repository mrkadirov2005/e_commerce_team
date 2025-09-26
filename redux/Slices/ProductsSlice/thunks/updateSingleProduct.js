import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateSingleProduct = createAsyncThunk(
  "products/updateSingleProduct",
  async (product) => {

    const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const data = await response.json();
    return data; // this updated product will be passed to the slice
  }
);
