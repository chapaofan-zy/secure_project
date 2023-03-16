import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import NoLogin from '../pages/NoLogin';

const routes = [
  {
    path: '/',
    auth: false,
    element: <Navigate to="/login" />,
  },
  {
    path: '/unlogin',
    auth: false,
    element: <NoLogin />,
  },
  {
    path: '/login',
    auth: false,
    element: <Login />,
  },
  {
    path: '/home',
    auth: true,
    element: <Home />,
  },
];

const Router: FunctionComponent = () => {
  function renderRoutes(routeMap: any[]) {
    return routeMap.map((e) => {
      return (
        <Route
          path={e.path}
          element={
            e.auth && !window.localStorage.getItem('token') ? (
              <Navigate to="/unlogin" />
            ) : (
              e.element
            )
          }
          key={e.path}
        >
          {e.children && renderRoutes(e.children)}
        </Route>
      );
    });
  }

  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> */}
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      {renderRoutes(routes)}
    </Routes>
  );
};

export default Router;
