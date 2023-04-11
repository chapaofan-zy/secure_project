import { Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBreadCrumb } from '../../store/slices/breadCrumb.slice';
import Decryption from './components/Decryption';
import Encryption from './components/Encryption';
import EqualityTest from './components/EqualityTest';
import styles from './index.module.scss';

const items: TabsProps['items'] = [
  {
    key: 'Encryption',
    label: `Encryption`,
    children: (
      <div className={styles.bg}>
        <Encryption />
      </div>
    ),
  },
  {
    key: 'Decryption',
    label: `Decryption`,
    children: (
      <div className={styles.bg}>
        <Decryption />
      </div>
    ),
  },
  {
    key: 'Equality Test',
    label: `Equality Test`,
    children: (
      <div className={styles.bg}>
        <EqualityTest />
      </div>
    ),
  },
];

const Index: React.FC = () => {
  const item = useSelector((state: any) => state.breadCrumb.items);

  const dispatch = useDispatch();

  function onChange(e: any) {
    const obj = [...item];
    obj[2] = { title: e };
    dispatch(setBreadCrumb(obj));
  }

  useEffect(() => {
    const obj = [...item];
    obj[2] = { title: 'Encryption' };
    dispatch(setBreadCrumb(obj));
  }, [dispatch]);

  return (
    <Tabs
      defaultActiveKey="Encryption"
      items={items}
      onChange={(e) => onChange(e)}
    />
  );
};

export default React.memo(Index);
