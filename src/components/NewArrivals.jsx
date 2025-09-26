import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, openCart } from '../../redux/Slices/CartSlice/cartSlice'
import { getAllProductsFromStore } from '../../redux/selectors'

const NewArrivals = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(getAllProductsFromStore)
  
  // Get first 4 products as "new arrivals"
  const newArrivals = products.slice(0, 4)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    dispatch(openCart()) // Open cart when item is added
  }

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
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
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    return stars
  }

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-12">NEW ARRIVALS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {newArrivals.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div 
                  className="bg-gray-100 p-8 flex items-center justify-center h-64 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => handleProductClick(product)}
                  title="Click to view product details"
                >
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {product.price < 200 && (
                  <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                    -{Math.round((1 - product.price / 300) * 100)}%
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 
                  className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  onClick={() => handleProductClick(product)}
                  title="Click to view product details"
                >
                  {product.title}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating.rate}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.price < 200 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ${Math.round(product.price * 1.3)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => {
              console.log('View All clicked')
              navigate('/products')
            }}
            className="bg-white border border-gray-300 text-black px-8 py-3 rounded hover:bg-gray-50 transition-colors duration-200 font-medium cursor-pointer"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewArrivals