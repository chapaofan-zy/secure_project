import { Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../api';

const Index: React.FC = () => {
  const [info, setInfo] = useState({
    username: '',
  });

  async function getInfo() {
    try {
      const res = await axios.get('/users/info');
      const obj = {
        username: res.data?.username,
      };
      setInfo(obj);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Descriptions title="个人信息" layout="vertical">
      <Descriptions.Item label="用户名">{info.username}</Descriptions.Item>
    </Descriptions>
  );
};

export default React.memo(Index);
