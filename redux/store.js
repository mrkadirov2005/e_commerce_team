import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./Slices/ProductsSlice/productsSlice"
import singleProductReducer from "./Slices/singleProductSlice/singleProductSlice"
export const store = configureStore({
  reducer: {
    products:productsReducer,
    product:singleProductReducer
  },
})