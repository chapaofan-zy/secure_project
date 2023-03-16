import { EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.module.scss';

interface IMyInput {
  label: string;
  isPassword?: boolean;
  onChange: (val: string) => void;
  hasIcon?: boolean;
  [key: string]: unknown;
}

const iconStyle = {
  marginLeft: 15,
  marginRight: 15,
};

const MyInput = ({
  label,
  isPassword = false,
  onChange,
  hasIcon = false,
}: IMyInput) => {
  const [inputType, setInputType] = useState(false);

  return (
    <div className={styles.inputBox}>
      <span className={styles.label}>{label}</span>
      <span
        style={{
          minWidth: hasIcon ? 60 : 20,
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        :
        {hasIcon &&
          (isPassword ? (
            <EyeInvisibleOutlined
              onClick={() => setInputType(!inputType)}
              style={iconStyle}
            />
          ) : (
            <UserOutlined style={iconStyle} />
          ))}
      </span>
      <input
        placeholder={`请输入${label}`}
        className={styles.input}
        type={!isPassword || inputType ? 'input' : 'password'}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export default React.memo(MyInput);
