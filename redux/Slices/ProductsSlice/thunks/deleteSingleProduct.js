// https://fakestoreapi.com/products/{id}
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteSingleProductById = createAsyncThunk(
  "products/deleteSingleProductById",
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to delete single product");
    }

    const data = await response.json();
    // fakestoreapi returns the deleted product object
    return { id, ...data }; 
  }
);
