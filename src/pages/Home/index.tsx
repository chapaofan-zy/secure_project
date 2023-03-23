import { Breadcrumb, Col, Menu, MenuProps, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubRouter from '../../routes/subRouter';
import Header from './components/Header';
import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '第一个',
    key: '1',
    children: [
      {
        label: '个人信息',
        key: '/identity',
      },
      {
        label: '1-2',
        key: '1-2',
      },
    ],
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [breadItems, setBreadItems] = useState([
    { title: 'Home' },
    { title: 'Identity' },
  ]);

  function onMenuChange(e: any) {
    navigate(`/home${e.key}`);
    const tmp = [...breadItems];
    const str = e.key[1].toUpperCase() + e.key.slice(2);
    tmp[1] = { title: str };
    setBreadItems(tmp);
    console.log(e);
  }

  return (
    <>
      <Header />
      <Row>
        <Col>
          <Menu
            mode="inline"
            onClick={(e) => onMenuChange(e)}
            // openKeys={openKeys}
            // onOpenChange={onOpenChange}
            style={{ width: 256 }}
            items={items}
          />
        </Col>
        <Col>
          <div className={styles.breadCrumb}>
            <Breadcrumb items={breadItems} />
          </div>
          <SubRouter />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(Index);
