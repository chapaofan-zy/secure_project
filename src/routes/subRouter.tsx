import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const routes = ['/identity', '/test', '/encryption'];

const getRoutes = (function getRoutes() {
  return routes.map((e: string) => {
    const str = `../pages/${e[1].toUpperCase() + e.slice(2)}`;
    return {
      path: `${e}`,
      auth: true,
      element: lazy(() => import(str)),
    };
  });
})();

const SubRouter: FC = () => {
  function renderRoutes(routeMap: any[]) {
    console.log(routeMap);

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
      {renderRoutes(getRoutes)}
    </Routes>
  );
};

export default React.memo(SubRouter);
