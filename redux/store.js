import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./Slices/ProductsSlice/productsSlice"
export const store = configureStore({
  reducer: {
    products:productsReducer
  },
})