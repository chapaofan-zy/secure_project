import { EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.scss';

const MyInput = React.memo(({ label, isPassword = false }: any) => {
  const [inputType, setInputType] = useState(false);

  return (
    <div className={styles.inputBox}>
      <span className={styles.label}>{label}:</span>
      <Input
        placeholder={`请输入${label}`}
        prefix={
          isPassword ? (
            <EyeInvisibleOutlined onClick={() => setInputType(!inputType)} />
          ) : (
            <UserOutlined />
          )
        }
        allowClear
        type={inputType ? 'input' : 'password'}
      />
    </div>
  );
});

const Index = () => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/tabindex-no-positive
    <div className={styles.circle} tabIndex={1}>
      <div className={styles.user}>
        <UserOutlined className={styles.icon} />
      </div>
      <div className={styles.bg}>
        <div className={styles.box}>
          <MyInput label="用户名" />
          <MyInput label="密码" isPassword />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Index);
