import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'User',
    key: 'home',
    children: [
      {
        label: '个人信息',
        key: 'identity',
      },
      {
        label: '1-2',
        key: 'test',
      },
    ],
  },
  {
    label: 'Operation',
    key: 'operation',
    children: [
      {
        label: '加/解密',
        key: 'encryption',
      },
    ],
  },
];

export default items;
