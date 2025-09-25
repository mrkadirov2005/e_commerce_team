import { createAsyncThunk } from "@reduxjs/toolkit";

export const addSingleProduct = createAsyncThunk(
  "products/addSingleProduct",
  async (product) => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    return data; // return the new product so it gets added to Redux state
  }
);
