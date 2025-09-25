import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./Slices/ProductsSlice/productsSlice"
import cartReducer from "./Slices/CartSlice/cartSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  },
})