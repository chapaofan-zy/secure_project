import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute: React.FC<any> = ({ auth = true, children }) => {
  return auth && !sessionStorage.getItem('token') ? (
    <Navigate to="/unlogin" />
  ) : (
    children
  );
};

export default AuthRoute;
