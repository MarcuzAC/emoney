import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.scss'; // Import your CSS file

const AdminProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [operationStatus, setOperationStatus] = useState(null); // 'success', 'error', or null

  useEffect(() => {
    // Check if the "products" collection exists, and create it if not
    const checkAndCreateCollection = async () => {
      try {
        await axios.get('http://localhost:5000/api/products');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Collection doesn't exist, create it
          await axios.post('http://localhost:5000/api/products/init');
        } else {
          console.error('Error checking/creating collection:', error);
        }
      }
    };

    checkAndCreateCollection();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const addProductToDatabase = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('image', productImage);

      const response = await axios.post('http://localhost:5000/api/products', formData);

      if (response.status === 201) {
        setOperationStatus('success');
        console.log('Product added to the database successfully');
        // Additional logic if needed
      }
    } catch (error) {
      setOperationStatus('error');
      console.error('Error adding product to the database:', error);
      // Handle error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductToDatabase();
    // Additional logic if needed
  };

  return (
    <div>
      <form className="admin-product-form" onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>
        <br />
        <label>
          Product Description:
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Product Price:
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Product Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>

      {operationStatus === 'success' && (
        <p className="success-message">Product added successfully!</p>
      )}
      {operationStatus === 'error' && (
        <p className="error-message">Error adding product. Please try again.</p>
      )}
    </div>
  );
};

export default AdminProductForm;
