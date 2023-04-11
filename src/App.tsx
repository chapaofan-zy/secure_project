import { Watermark } from 'antd';
import React from 'react';
import Router from './routes';
import styles from './styles/vendors.module.scss';

const App = () => (
  <Watermark
    content="chapaofan_demo"
    font={{ color: 'rgba(0, 0, 0, 0.05' }}
    gap={[200, 200]}
  >
    <div className={styles.img} />
    <div className={styles.bg}>
      <Router />
    </div>
  </Watermark>
);

export default App;
