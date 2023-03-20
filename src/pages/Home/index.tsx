import { Menu, MenuProps } from 'antd';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '第一个',
    key: '1',
    children: [
      {
        label: '1-1',
        key: '1-1',
      },
    ],
  },
];

const Index = () => {
  return (
    <>
      <div>1</div>
      <Menu
        mode="inline"
        // openKeys={openKeys}
        // onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
      />
    </>
  );
};

export default React.memo(Index);
