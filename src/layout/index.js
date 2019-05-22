import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import './index.css'

import Login from '../pages/Login';
import Banner from '../pages/Banner';
import Grid from '../pages/Grid';
import BasicDataRegion from '../pages/BasicData/regios/index';

const { Header, Sider, Content } = Layout;

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span><Link to="/grid">责任网络</Link></span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span><Link to="/basicData/region">基本数据</Link></span>
            </Menu.Item>
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
            <Route path="/grid" exact component={Grid} />
            <Route path="/basicData/region" exact component={BasicDataRegion} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}