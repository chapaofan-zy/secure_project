import React from 'react';
import styles from './index.module.scss';

const Header = () => {
  return <div className={styles.header}>Header</div>;
};

export default React.memo(Header);
