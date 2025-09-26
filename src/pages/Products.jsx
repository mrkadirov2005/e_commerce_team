import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllProductsFromStore } from '../../redux/selectors'
import Header from '../components/Header'
import Cart from '../components/Cart'

const Products = () => {
  const navigate = useNavigate()
  const products = useSelector(getAllProductsFromStore)

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <span 
            className="hover:text-gray-900 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">All Products</span>
        </nav>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-black mb-12">All Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div 
                  className="bg-gray-100 p-8 flex items-center justify-center h-64 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => navigate(`/product/${product.id}`)}
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
                  onClick={() => navigate(`/product/${product.id}`)}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart />
    </div>
  )
}

export default Products
