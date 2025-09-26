import { createSlice } from "@reduxjs/toolkit";
import { addNewUser, deleteSingleUser, fetchAllUsers, getSingleUser, updateSingleUser } from "./thunks/thunks";

const initialState = {
  users: [],
  singleUser: null,
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ✅ fetchAllUsers
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ getSingleUser
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ addNewUser
    builder
      .addCase(addNewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ updateSingleUser
    builder
      .addCase(updateSingleUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSingleUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = action.payload;
        if (state.singleUser?.id === action.payload.id) {
          state.singleUser = action.payload;
        }
      })
      .addCase(updateSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ✅ deleteSingleUser
    builder
      .addCase(deleteSingleUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSingleUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((u) => u.id !== action.payload.id);
        if (state.singleUser?.id === action.payload.id) {
          state.singleUser = null;
        }
      })
      .addCase(deleteSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
