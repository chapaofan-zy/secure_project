import { UserOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './index.module.scss';
import './index.scss';
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
      <div className={styles.title}>xxx系统</div>
      <div className={styles.circle}>
        <SwitchTransition mode="out-in">
          <CSSTransition timeout={300} key={toggle} classNames="fade">
            {loginMap.current[toggle]}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default React.memo(Index);
