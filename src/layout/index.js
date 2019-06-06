import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import './index.css'
import Routes from '@/routes'
import { allRouters } from '@/routes'

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

  fnMenuList = () => {
    let arr = Routes.map(item => {
      if (item.routes) {
        return (
          <SubMenu
            key={item.path}
            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
          >
            {
              item.routes.map((item2) => {
                return (
                  <Menu.Item key={item2.path}>
                    <Link to={item2.path}>
                      <Icon type={item2.icon} />
                      <span>{item2.name}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={this.state.defaultOpenKeys} defaultSelectedKeys={this.state.defaultSelectedKeys}>
        {arr}
      </Menu>
    )
  }

  componentWillMount() {
    let pathname = this.props.location.pathname
    let pathSnippets = pathname.split('/').filter(item => item)
    let defaultOpenKeys = [`/${pathSnippets[0]}`, `/${pathSnippets[0]}/${pathSnippets[1]}`]
    this.setState((state, props) => {
      return {
        defaultOpenKeys: defaultOpenKeys,
        defaultSelectedKeys: [`${pathname}`]
      }
    })
  }

  render() {
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          {
            this.fnMenuList()
          }
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
            {
              allRouters.map((item, index) => {
                return (
                  <Route key={index} path={item.path} exact component={item.component} />
                )
              })
            }
            {/* {
              Routes.map((item, index) => {
                if (!item.notLayout) {
                  return (
                    <Route key={index} path={item.path} exact component={item.component} />
                  )
                } else {
                  return null
                }
              })
            } */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}