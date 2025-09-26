// thunks/fetchAllUsers.js

import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const res = await fetch("https://fakestoreapi.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  }
);

// thunks/getSingleUser.js


export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (id) => {
    const res = await fetch(`https://fakestoreapi.com/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch single user");
    return await res.json();
  }
);

// thunks/addNewUser.js


export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (user) => {
    const res = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Failed to add user");
    return await res.json();
  }
);

// thunks/updateSingleUser.js


export const updateSingleUser = createAsyncThunk(
  "users/updateSingleUser",
  async (user) => {
    const res = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return await res.json();
  }
);

// thunks/deleteSingleUser.js


export const deleteSingleUser = createAsyncThunk(
  "users/deleteSingleUser",
  async (id) => {
    const res = await fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to delete user");
    return { id }; // fakestore returns deleted user, but we only need ID
  }
);
