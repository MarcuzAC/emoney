import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            {/* Additional product details if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductList;
