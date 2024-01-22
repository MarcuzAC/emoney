// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, isAdmin }) => {
  if (isAuthenticated && isAdmin) {
    return <Route element={element} />;
  } else {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
