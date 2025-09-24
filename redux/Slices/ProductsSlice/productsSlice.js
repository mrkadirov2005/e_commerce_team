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
    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.products=action.payload;
    })
  },
})

// Export actions for use in components
// export const {  } = productsSlice.actions

export default productsSlice.reducer
