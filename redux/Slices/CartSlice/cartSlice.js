import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        } else {
          item.quantity = quantity
        }
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    openCart: (state) => {
      state.isOpen = true
    },
    
    closeCart: (state) => {
      state.isOpen = false
    }
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart 
} = cartSlice.actions

export default cartSlice.reducer
