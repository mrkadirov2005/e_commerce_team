import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems } from '../../redux/selectors'
import { addToCart, updateQuantity, removeFromCart, closeCart } from '../../redux/Slices/CartSlice/cartSlice'

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(getCartItems)
  const [selectedSize, setSelectedSize] = useState('Large')
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('Dark Olive Green')

  if (!isOpen || !product) return null

  const cartItem = cartItems.find(item => item.id === product.id)
  const isInCart = !!cartItem

  const sizes = ['Small', 'Medium', 'Large', 'X-Large']
  const colors = [
    { name: 'Dark Olive Green', value: '#556B2F' },
    { name: 'Dark Teal', value: '#008B8B' },
    { name: 'Dark Navy Blue', value: '#000080' }
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    return stars
  }

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity + quantity }))
    } else {
      dispatch(addToCart(product))
    }
    onClose()
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const originalPrice = Math.round(product.price * 1.4)
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Product Images */}
          <div className="lg:w-1/2 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnail Images */}
              <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
              
              {/* Main Image */}
              <div className="flex-1 order-1 lg:order-2">
                <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {renderStars(product.rating.rate)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.rate}/5
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${originalPrice}
                </span>
                <span className="bg-pink-500 text-white text-sm px-2 py-1 rounded">
                  -{discount}%
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {product.description || "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Colors</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name 
                        ? 'border-gray-900' 
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <svg className="w-4 h-4 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Size</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              {isInCart ? 'Update Cart' : 'Add to Cart'}
            </button>

            {/* Cart Item Info */}
            {isInCart && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  {cartItem.quantity} item(s) in cart
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="text-sm text-red-600 hover:text-red-800 mt-1"
                >
                  Remove from cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
