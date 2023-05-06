import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
// import SubRouter from '../../routes/subRouter';
import { setBreadCrumb } from '../../store/slices/breadCrumb.slice';
import MHeader from './components/Header';
import styles from './index.module.scss';
import items from './menuItems';
import { RootState } from '../../store';

const MBread = React.memo(() => {
  const breadItems = useSelector((state: RootState) => state.breadCrumb.items);
  useEffect(() => {}, [breadItems]);
  return (
    <div className={styles.breadCrumb}>
      <Breadcrumb items={breadItems} />
    </div>
  );
});

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onMenuChange(e: any) {
    dispatch(
      setBreadCrumb(
        e.keyPath.reverse().map((el: string) => {
          return {
            title: el[0].toUpperCase() + el.slice(1),
          };
        }),
      ),
    );
    navigate(`/home/${e.key}`);
  }

  return (
    <>
      <MHeader />
      <Layout hasSider>
        <Layout.Sider width={256} className={styles.sider}>
          <Menu
            mode="inline"
            onClick={(e) => onMenuChange(e)}
            defaultOpenKeys={['home']}
            defaultSelectedKeys={['identity']}
            items={items}
          />
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <MBread />
          <div className={styles.bg}>
            {/* <SubRouter /> */}
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default React.memo(Index);
