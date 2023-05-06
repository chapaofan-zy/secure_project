import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import hash from 'object-hash';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import axios from '../../api';
import MyInput from './MyInput';
import { setUserVal } from '../../store/slices/user.slice';

const Login = ({ setToggle }: { setToggle: (val: number) => void }) => {
  const loginParam = useRef({ username: '', password: '' });
  const [notice, setNotice] = useState({ flag: false, content: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login() {
    try {
      const res = await axios.post('/users/login', {
        username: loginParam.current.username,
        password: hash(loginParam.current.password, { algorithm: 'md5' }),
      });
      if (res?.data) {
        console.log(res);

        if (res.data?.flag) {
          await new Promise((resolve) => {
            window.sessionStorage.setItem('token', res.data.token);
            dispatch(
              setUserVal({
                key: 'username',
                value: loginParam.current.username,
              }),
            );
            dispatch(
              setUserVal(
                setUserVal({
                  key: 'token',
                  value: res.data.token,
                }),
              ),
            );
            resolve(null);
          });
          // window.sessionStorage.setItem('token', res.data.token);
          // dispatch(setName(loginParam.current.username));
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
