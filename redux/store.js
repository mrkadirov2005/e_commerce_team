import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./Slices/ProductsSlice/productsSlice"
<<<<<<< HEAD
import singleProductReducer from "./Slices/singleProductSlice/singleProductSlice"
export const store = configureStore({
  reducer: {
    products:productsReducer,
    product:singleProductReducer
=======
import cartReducer from "./Slices/CartSlice/cartSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
>>>>>>> 2af6a42 (Add cart functionality, product detail pages, and routing system)
  },
})