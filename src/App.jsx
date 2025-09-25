import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Routes, Route } from "react-router-dom";
import './App.css' 
import { fetchProducts } from "../redux/Slices/ProductsSlice/thunks/getAllProductsThunk"; 
import { getAllProductsFromStore } from "../redux/selectors";
import Header from "./components/Header";
import NewArrivals from "./components/NewArrivals";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsFromStore);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading products...</p>
    </div>
  );
  
  if (status === "failed") return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-red-600">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <Header />
            
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="text-sm text-gray-600">
                <span className="hover:text-gray-900 cursor-pointer">Home</span>
                <span className="mx-2">&gt;</span>
                <span className="hover:text-gray-900 cursor-pointer">Shop</span>
                <span className="mx-2">&gt;</span>
                <span className="hover:text-gray-900 cursor-pointer">Men</span>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-900">T-shirts</span>
              </nav>
            </div>

            {/* New Arrivals Section */}
            <NewArrivals />
            
            {/* Cart Sidebar */}
            <Cart />
          </>
        } />
        
        {/* Product Detail Page */}
        <Route path="/product/:productId" element={<ProductDetail />} />
        
        {/* All Products Page */}
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
