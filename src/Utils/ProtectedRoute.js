// src/utils/ProtectedRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  // Implement your authentication check logic here
  const token = localStorage.getItem('token');
  return token != null;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default ProtectedRoute;
