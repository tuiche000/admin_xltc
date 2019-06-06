import Login from '@/pages/Login';
import Banner from '@/pages/Banner';
// 责任网络
import Grid from '@/pages/Grid';
// 问题台账
import Issue from '@/pages/Issue';
// 踏查管理
import Tacha from '@/pages/Tacha';
// 基本数据
import BasicDataRegion from '@/pages/BasicData/regios/index';
import BasicDataDictionary from '@/pages/BasicData/Dictionary';
import BasicDataUpload from '@/pages/BasicData/Upload';
// 权限管理
import UsersManager from '@/pages/Users/manager/index';
import Department from '@/pages/Users/department/index';
import DepartmentFrom from '@/pages/Users/department/form';
// 地图测试
import MapTest from '@/pages/Map';

export const allRouters = [
    { path: '/', component: Banner },
    { path: '/map', component: MapTest },
    { path: '/login', component: Login },
    { path: '/users/manager', component: UsersManager },
    { path: '/users/department', component: Department },
    { path: '/users/department/form', component: DepartmentFrom },
    { path: '/grid', component: Grid },
    { path: '/issue', component: Issue },
    { path: '/tacha', component: Tacha },
    { path: '/basicData/region', component: BasicDataRegion },
    { path: '/basicData/dictionary', component: BasicDataDictionary,},
    { path: '/basicData/upload', component: BasicDataUpload,},
]
export default [
  // { path: '/', component: 'Banner', name: '首页', icon: 'home' },
  {
    path: '/users',
    name: '权限管理',
    icon: 'user',
    routes: [
      {
        path: '/users/manager',
        name: '用户管理',
        component: 'UsersManager'
      },
      {
        path: '/users/department',
        name: '责任部门',
        component: 'Department'
      },
    ]
  },
  { path: '/map', component: 'MapTest', name: '地图测试', icon: 'home' },
  { path: '/grid', component: 'Grid', name: '责任网络', icon: 'home' },
  {
    path: '/basicData',
    name: '基本数据',
    icon: 'user',
    routes: [
      {
        path: '/basicData/region',
        name: '行政区域',
        component: 'BasicDataRegion'
      },
      {
        path: '/basicData/dictionary',
        name: '字典管理',
        component: 'BasicDataDictionary'
      },
      {
        path: '/basicData/upload',
        name: '文件管理',
        component: 'BasicDataUpload'
      },
    ]
  },
  { path: '/issue', component: 'Grid', name: '问题台账', icon: 'home' },
  {
    path: '/tacha',
    name: '踏查管理',
    icon: 'user',
    component: Tacha,
  },
]