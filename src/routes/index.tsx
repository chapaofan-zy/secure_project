import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const Router: FunctionComponent = () => {
  function renderRoutes() {
    const routePaths = ['login'];
    return routePaths.map((e) => {
      const Component = lazy(() => import(`../pages/${e}`));
      return (
        <Route
          key={Math.random()}
          path={`/${e.toLowerCase()}`}
          element={
            <Suspense>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {renderRoutes()}
    </Routes>
  );
};

export default Router;
