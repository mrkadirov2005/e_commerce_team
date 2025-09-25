import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCartItems, getCartTotalItems, getCartTotalPrice, getCartIsOpen } from '../../redux/selectors'
import { updateQuantity, removeFromCart, clearCart, closeCart } from '../../redux/Slices/CartSlice/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(getCartItems)
  const totalItems = useSelector(getCartTotalItems)
  const totalPrice = useSelector(getCartTotalPrice)
  const isOpen = useSelector(getCartIsOpen)

  if (!isOpen) return null

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId))
    } else {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }))
    }
  }

  const handleProductClick = (product, event) => {
    event.stopPropagation() // Prevent event bubbling
    console.log('Product clicked:', product.title) // Debug log
    dispatch(closeCart()) // Close cart first
    navigate(`/product/${product.id}`) // Navigate to product detail page
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => dispatch(closeCart())} />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={() => dispatch(closeCart())}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div 
                      className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative group"
                      onClick={(e) => handleProductClick(item, e)}
                      title="Click to view product details"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div 
                      className="flex-1 min-w-0 cursor-pointer group"
                      onClick={(e) => handleProductClick(item, e)}
                      title="Click to view product details"
                    >
                      <h3 className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <p className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Click to view details
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuantityChange(item.id, item.quantity - 1)
                        }}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuantityChange(item.id, item.quantity + 1)
                        }}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(removeFromCart(item.id))
                        }}
                        className="text-xs text-red-600 hover:text-red-800 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-black text-white py-3 px-4 rounded font-medium hover:bg-gray-800 transition-colors duration-200">
                    Checkout
                  </button>
                  
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </>
  )
}

export default Cart
