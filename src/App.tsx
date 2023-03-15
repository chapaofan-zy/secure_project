import React from 'react';
import Router from './routes';
import styles from './styles/vendors.module.scss';

const App = () => (
  <div className={styles.bg}>
    <Router />
  </div>
);

export default App;
