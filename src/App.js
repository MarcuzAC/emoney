// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AdminPanel from './admin/AdminPanel';
import ProductDetails from './components/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './style.scss';

function App() {
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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
            <li className="admin-link">
              <Link to="/admin">Admin Panel</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/product/:productId" element={<ProductDetails token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />

          {/* Use a Route element directly for the AdminPanel route */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={<AdminPanel />} isAuthenticated={Boolean(token)} isAdmin={isAdmin} />}
          />
          {/* Redirect to login if trying to access admin without authentication */}
          <Route
            path="/admin"
            element={token ? <AdminPanel /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
