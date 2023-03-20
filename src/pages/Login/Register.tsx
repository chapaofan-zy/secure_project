import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import hash from 'object-hash';
import styles from './index.module.scss';
import axios from '../../api';
import MyInput from './MyInput';

const Register = ({ setToggle }: { setToggle: (val: number) => void }) => {
  const [isNull, setIsNull] = useState(false);
  const [notSame, setNotSame] = useState(false);
  const [notice, setNotice] = useState({ flag: false, content: '' });
  const loginParam = useRef({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  async function register() {
    setIsNull(false);
    setNotSame(false);
    setNotice({ flag: false, content: '' });
    const { username, password, confirmPassword } = loginParam.current;
    if (!username || !password || !confirmPassword) {
      setIsNull(true);
      return;
    }
    if (password !== confirmPassword) {
      setNotSame(true);
      return;
    }
    try {
      const res = await axios.post('/users/register', {
        username,
        password: hash(password, { algorithm: 'md5' }),
        confirmPassword: hash(confirmPassword, { algorithm: 'md5' }),
      });
      if (res?.data?.result === 'fail') {
        setNotice({ flag: true, content: res.data?.content });
        return;
      }

      if (res?.data) {
        await new Promise((resolve) => {
          window.localStorage.setItem('token', res.data?.token);
          resolve(null);
        });
        navigate('/home');
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
        <MyInput
          label="确认密码"
          isPassword
          onChange={(val: string) => {
            loginParam.current.confirmPassword = val;
          }}
          hasIcon
        />
        {isNull && <div>用户名或密码为空！</div>}
        {notSame && <div>两次输入的密码不一致！</div>}
        {notice.flag && <div>{notice.content}</div>}
        <div className={styles.login} onClick={() => register()}>
          <span>register</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Register);
