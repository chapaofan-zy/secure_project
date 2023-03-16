import { UserOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import axios from '../../api';
import MyInput from './MyInput';

const Index = () => {
  const loginParam = useRef({ username: '', password: '' });
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post('/users/login', loginParam.current);
      if (res?.data) {
        await new Promise((resolve) => {
          window.localStorage.setItem('token', res.data);
          resolve(null);
        });
        navigate('/home');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.circle}>
      {toggle ? (
        <div className={styles.user} onClick={() => setToggle(!toggle)}>
          <UserOutlined className={styles.icon} />
        </div>
      ) : (
        <div className={styles.box}>
          <div onClick={() => setToggle(!toggle)}>back</div>
          <div className={styles.bg}>
            <MyInput
              label="用户名"
              onChange={(val: string) => {
                loginParam.current.username = val;
              }}
              hasIcon
            />
            <MyInput
              label="密码"
              isPassword
              onChange={(val: string) => {
                loginParam.current.password = val;
              }}
              hasIcon
            />
            <div className={styles.login} onClick={() => login()}>
              <span>login</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Index);
