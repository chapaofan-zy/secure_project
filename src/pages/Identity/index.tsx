import { Descriptions, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../api';
import common from '../../styles/common.module.scss';

const Index: React.FC = () => {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(true);

  async function getInfo() {
    try {
      const res = await axios.get('/users/info');
      const obj = {
        username: res.data?.username,
      };
      setLoading(false);
      setInfo(obj);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return loading ? (
    <div className={common.spin}>
      <Spin size="large" />
    </div>
  ) : (
    <Descriptions title="个人信息" layout="vertical">
      <Descriptions.Item label="用户名">{info.username}</Descriptions.Item>
    </Descriptions>
  );
};

export default React.memo(Index);
