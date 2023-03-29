import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';
import styles from './index.module.scss';

interface IBreadHeader {
  items: ItemType[];
}

const BreadHeader = ({ items }: IBreadHeader) => {
  return (
    <div className={styles.breadCrumb}>
      <Breadcrumb items={items} />
    </div>
  );
};

export default BreadHeader;
