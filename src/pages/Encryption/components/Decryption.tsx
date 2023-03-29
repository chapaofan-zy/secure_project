import { Descriptions, Input } from 'antd';
import React, { useState } from 'react';

const Decryption = () => {
  const [crypted, setCrypted] = useState('');
  return (
    <Descriptions layout="vertical" column={1}>
      <Descriptions.Item label="密文">
        <Input.TextArea onChange={(e) => setCrypted(e.target.value)} />
      </Descriptions.Item>
      <Descriptions.Item label="明文">{crypted}</Descriptions.Item>
    </Descriptions>
  );
};

export default React.memo(Decryption);
