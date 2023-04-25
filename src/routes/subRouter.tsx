import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

interface IRoute {
  path: string;
  element: React.LazyExoticComponent<any>;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/identity',
    element: lazy(() => import('../pages/Identity')),
  },
  {
    path: '/test',
    element: lazy(() => import('../pages/Test')),
  },
  {
    path: '/encryption',
    element: lazy(() => import('../pages/Encryption')),
  },
];

const SubRouter: FC = () => {
  function renderRoutes(routeMap: any[]) {
    console.log(routeMap);

    return routeMap.map((e) => {
      return (
        <Route
          path={e.path}
          element={
            !window.localStorage.getItem('token') ? (
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

export default React.memo(SubRouter);
