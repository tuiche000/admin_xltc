import Login from "@/pages/Login";
// 后台首页
import Home from "@/pages/AdminHome/index";
// 责任网格
import Grid from "@/pages/Grid";
// 问题台账
import Issue from "@/pages/Issue";
// 踏查管理
import Tacha from "@/pages/Tacha";
// 消息管理
import Message from "@/pages/Message";
// 基本数据
import BasicDataRegion from "@/pages/BasicData/regios/index";
// 权限管理
import UsersManager from "@/pages/users/manager/index";
import Department from "@/pages/users/department/index";
import Roles from "@/pages/users/roles/index";
// 地图测试
import MapTest from "@/pages/Map";

export const allRouters = [
  { path: "/map", component: MapTest },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/users/manager", component: UsersManager },
  { path: "/users/department", component: Department },
  { path: "/users/roles", component: Roles },
  { path: "/grid", component: Grid },
  { path: "/issue", component: Issue },
  { path: "/tacha", component: Tacha },
  { path: "/message", component: Message },
  { path: "/basicData/region", component: BasicDataRegion },
  { path: "/basicData/dictionary", component: BasicDataDictionary,},
  { path: "/basicData/upload", component: BasicDataUpload,},
];
export default [
  { path: '/home', component: 'Home', icon: 'home', name: '首页' },
  {
    path: "/tacha",
    name: "踏查管理",
    icon: 'radar-chart',
    component: Tacha,
  },
  { path: "/issue", component: "Grid", icon: 'question', name: "问题台账", },
  { path: "/message", component: "Message", icon: 'message', name: "消息管理", },
  {
    path: "/users",
    name: "用户管理",
    icon: 'user',
    routes: [
      {
        path: "/users/manager",
        name: "系统用户",
        component: "UsersManager"
      },
      {
        path: "/users/roles",
        name: "角色管理",
        component: "Roles"
      },
      {
        path: "/users/department",
        name: "责任部门",
        component: "Department"
      },
    ]
  },
  // { path: '/map', component: 'MapTest', name: '地图测试', icon: 'home' },
  {
    path: "/basicData",
    name: "配置管理",
    icon: 'setting',
    routes: [
      {
        path: "/basicData/region",
        name: "行政区域",
        component: "BasicDataRegion"
      },
      { path: "/grid", component: "Grid", name: "责任网格" },
    ]
  },
];