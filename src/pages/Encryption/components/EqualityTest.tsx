import { Descriptions, Input } from 'antd';
import React, { useState } from 'react';

const EqualityTest = () => {
  return (
    <Descriptions layout="vertical" column={1}>
      <Descriptions.Item label="密文">
        <Input.TextArea />
      </Descriptions.Item>
      <Descriptions.Item label="密文">
        <Input.TextArea />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default React.memo(EqualityTest);
