import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Login from '../pages/Login';
import styles from './index.module.scss';
import AuthRoute from './AuthRoute';

interface IRoute {
  path: string;
  auth?: boolean;
  element: React.LazyExoticComponent<any>;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/unlogin',
    auth: false,
    element: lazy(() => import('../pages/NoLogin')),
  },
  {
    path: '/home',
    auth: true,
    element: lazy(() => import('../pages/Home')),
    children: [
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
    ],
  },
];

const Router: FunctionComponent = () => {
  function renderRoutes(routeMap: any[], parentPath: string) {
    return routeMap.map((e) => {
      const auth = e.auth !== undefined ? e.auth : true;
      return (
        <Route
          path={parentPath + e.path}
          element={
            <AuthRoute auth={auth}>
              <Suspense
                fallback={
                  <div className={styles.spin}>
                    <Spin />
                  </div>
                }
              >
                <e.element />
              </Suspense>
            </AuthRoute>
          }
          key={e.path}
        >
          {e.children && renderRoutes(e.children, e.path)}
        </Route>
      );
    });
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {renderRoutes(routes, '')}
    </Routes>
  );
};

export default Router;
