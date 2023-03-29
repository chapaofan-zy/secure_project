import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SubRouter from '../../routes/subRouter';
import { setBreadCrumb } from '../../store/slices/breadCrumb.slice';
import MHeader from './components/Header';
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
        key: '/test',
      },
      {
        label: '加/解密',
        key: '/encryption',
      },
    ],
  },
];

const Index = () => {
  const navigate = useNavigate();
  // const [breadItems, setBreadItems] = useState([
  //   { title: 'Home' },
  //   { title: 'Identity' },
  // ]);
  const breadItems = useSelector((state: any) => state.breadCrumb.items);
  const dispatch = useDispatch();

  function onMenuChange(e: any) {
    navigate(`/home${e.key}`);
    const tmp = [...breadItems].slice(0, 2);
    const str = e.key[1].toUpperCase() + e.key.slice(2);
    tmp[1] = { title: str };
    dispatch(setBreadCrumb(tmp));
  }

  useEffect(() => {}, [breadItems]);

  return (
    <>
      <MHeader />
      <Layout hasSider>
        <Layout.Sider width={256} className={styles.sider}>
          <Menu
            mode="inline"
            onClick={(e) => onMenuChange(e)}
            // openKeys={openKeys}
            // onOpenChange={onOpenChange}
            style={{ width: '100%' }}
            items={items}
          />
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <div className={styles.breadCrumb}>
            <Breadcrumb items={breadItems} />
          </div>
          <div className={styles.bg}>
            <SubRouter />
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default React.memo(Index);
