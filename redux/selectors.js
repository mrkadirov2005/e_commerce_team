export const getAllProductsFromStore = (state) => state.products.products

// Cart selectors
export const getCartItems = (state) => state.cart.items
export const getCartTotalItems = (state) => state.cart.totalItems
export const getCartTotalPrice = (state) => state.cart.totalPrice
export const getCartIsOpen = (state) => state.cart.isOpen