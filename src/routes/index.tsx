import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const routes = [
  {
    path: '/unlogin',
    auth: false,
    element: lazy(() => import('../pages/NoLogin')),
  },
  {
    path: '/home/*',
    auth: true,
    element: lazy(() => import('../pages/Home')),
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
              <Navigate to="/login" state={{ unload: true }} />
            ) : (
              <Suspense>
                <e.element />
              </Suspense>
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
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {renderRoutes(routes)}
    </Routes>
  );
};

export default Router;
