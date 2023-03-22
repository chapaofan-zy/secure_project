import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/identity',
    auth: true,
    element: lazy(() => import('../pages/Identity')),
  },
];

const SubRouter: FunctionComponent = () => {
  function renderRoutes(routeMap: any[]) {
    return routeMap.map((e) => {
      return (
        <Route
          path={e.path}
          element={
            e.auth && !window.localStorage.getItem('token') ? (
              <Navigate to="/unlogin" />
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
      <Route path="/" element={<Navigate to="/home/identity" />} />
      {renderRoutes(routes)}
    </Routes>
  );
};

export default SubRouter;
