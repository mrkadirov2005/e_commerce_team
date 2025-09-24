import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import './App.css' 
import { fetchProducts } from "../redux/Slices/ProductsSlice/thunks/getAllProductsThunk"; 
import { getAllProductsFromStore } from "../redux/selectors";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsFromStore);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p className="loading">Loading products...</p>;
  if (status === "failed") return <p className="error">Error: {error}</p>;

  return (
    <div className="products-grid flex items-center justify-between gap-5 flex-wrap">
      {products.map(item => (
        <div key={item.id} className="product-card w-36">
          <div className="product-image-wrapper">
            <img src={item.image} alt={item.title} className="product-image" />
          </div>
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">${item.price}</p>
          <p className="product-rating">{item.rating.rate} ⭐ | {item.rating.count} available</p>
          <p className="product-category">{item.category}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
