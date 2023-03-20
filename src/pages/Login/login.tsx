import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import hash from 'object-hash';
import styles from './index.module.scss';
import axios from '../../api';
import MyInput from './MyInput';

const Login = ({ setToggle }: { setToggle: (val: number) => void }) => {
  const loginParam = useRef({ username: '', password: '' });
  const [notice, setNotice] = useState({ flag: false, content: '' });
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post('/users/login', {
        username: loginParam.current.username,
        password: hash(loginParam.current.password, { algorithm: 'md5' }),
      });
      if (res?.data) {
        if (res.data?.flag) {
          await new Promise((resolve) => {
            window.localStorage.setItem('token', res.data);
            resolve(null);
          });
          navigate('/home');
        } else {
          setNotice({ flag: true, content: res.data?.content });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.box}>
      <LeftOutlined onClick={() => setToggle(0)} className={styles.back} />
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
        {notice.flag && <div>{notice.content}</div>}
        <div className={styles.login} onClick={() => login()}>
          <span>login</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
