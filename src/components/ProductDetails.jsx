// ProductDetails.js

import React from 'react';
import axios from 'axios';
import '../style.scss';

function ProductDetails({ token }) {
  const handlePurchase = async () => {
    try {
      // Make a request to your backend to initiate payment
      await axios.post('http://localhost:5000/api/payment', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update the UI or redirect to a success page
      alert('Payment successful!');
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle payment failure (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      <p>Description of the product.</p>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
}

export default ProductDetails;
