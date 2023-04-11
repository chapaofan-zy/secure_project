import { UserOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import Login from './login';
import Register from './Register';

const Default = React.memo(
  ({ setToggle }: { setToggle: (val: number) => void }) => {
    return (
      <>
        <div className={styles.user} onClick={() => setToggle(1)}>
          <UserOutlined className={styles.icon} />
        </div>
        <div className={styles.indexBtn}>
          <span onClick={() => setToggle(1)}>Login</span>
          <span onClick={() => setToggle(2)}>Register</span>
        </div>
      </>
    );
  },
);

const Index = () => {
  const [toggle, setToggle] = useState(0);
  const loginMap = useRef([
    <Default setToggle={setToggle} />,
    <Login setToggle={setToggle} />,
    <Register setToggle={setToggle} />,
  ]);

  return (
    <>
      <div className={styles.title}>ikun系统</div>
      <div className={styles.circle}>{loginMap.current[toggle]}</div>
    </>
  );
};

export default React.memo(Index);
