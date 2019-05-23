import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import './index.css'

import Login from '@/pages/Login';
import Banner from '@/pages/Banner';
import Grid from '@/pages/Grid';
import BasicDataRegion from '@/pages/BasicData/regios/index';
import RegionForm from '@/pages/BasicData/regios/form';
import department from '@/pages/users/department/index';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      collapsed: false,
    };

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
            <SubMenu
              title={
                <span>
                  <Icon type="user" />
                  <span>权限管理</span>
                </span>
              }
            >
              <Menu.Item key="/users/department">
                <Link to="/users/department">
                  <span>责任部门</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="1">
              <Link to="/grid">
                <Icon type="user" />
                <span>责任网络</span>
              </Link>
            </Menu.Item>
            <SubMenu
              title={
                <span>
                  <Icon type="user" />
                  <span>基本数据</span>
                </span>
              }
            >
              <Menu.Item key="2">
                <Link to="/basicData/region">
                  <span>行政区域</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Route path="/" exact component={Banner} />
            <Route path="/login" component={Login} />
            <Route path="/users/department" component={department} />
            <Route path="/grid" exact component={Grid} />
            <Route path="/basicData/region" exact component={BasicDataRegion} />
            <Route path="/basicData/region/form" exact component={RegionForm} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}