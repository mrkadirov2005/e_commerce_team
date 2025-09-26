import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./Slices/ProductsSlice/productsSlice"
import cartsReducer from "./Slices/cartsSlice/cartsSlice"
import usersReducer from "./Slices/userSlices/usersSlice"
import authReducer from "./Slices/authSlice/authSlice"
export const store = configureStore({
  reducer: {
    products:productsReducer,
    cart:cartsReducer,
    users:usersReducer,
    auth:authReducer


  },
})