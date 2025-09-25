import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './thunks/getAllProductsThunk'

const initialState = {
  value: 0,
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Export actions for use in components
// export const {  } = productsSlice.actions

export default productsSlice.reducer
