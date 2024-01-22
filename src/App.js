// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import './style.scss';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="login-link">
              <Link to="/login">Login</Link>
            </li>
            <li className="register-link">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/product/:productId" element={<ProductDetails token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
