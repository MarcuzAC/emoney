import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.scss';

const Home = ({ cart, addToCart, isAuthenticated }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API only if the user is logged in
    if (isAuthenticated) {
      axios.get('http://localhost:5000/api/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    }
  }, [isAuthenticated]);

  return (
    <div className="home-page">
      <h2>Product Catalog</h2>
      {isAuthenticated ? (
        <div className="product-container">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <p>{product.name}</p>
                <p>${product.price} per unit</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to view products.</p>
      )}

      <Link to="/cart">View Cart</Link>
    </div>
  );
};

export default Home;
