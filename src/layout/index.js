import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Avatar, Modal, Dropdown, Form, Input, message } from 'antd';
import { Route, Link } from 'react-router-dom';
import './index.css'
import Routes from '@/routes'
import { allRouters } from '@/routes'

import { connect } from 'react-redux';
import { userInfo, loginOut } from '@/actions';
import LogoImg from '@/assets/logo.png'

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

@connect((state, props) => Object.assign({}, props, state), {
  userInfo, loginOut
})
export default class BasicLayout extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      collapsed: false,
      modalVisible: false,
      password: ""
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

  userSelf = async () => {
    let data = await window._api.userSelf()
    this.props.userInfo(data);
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
    this.userSelf()
  }

  render() {
    const _this = this
    const { name, avatar, levelName, id } = this.props.admin.user_info || {}
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <div><img width="50" src={LogoImg}></img></div>
            {
              !this.state.collapsed && <div>市政管理巡查责任制网格平台</div>
            }
          </div>
          {
            this.fnMenuList()
          }
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row type="flex" justify="space-between">
              <Col>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col style={{ marginRight: 24 }}>
                <Row gutter={10} type="flex">
                  <Col>
                    <Avatar src={avatar} icon="user" />
                  </Col>
                  <Col>
                    <Dropdown overlay={() => (
                      <Menu>
                        <Menu.Item>
                          <a href="javascript:void(0)" onClick={() => {
                            this.setState({
                              modalVisible: true
                            })
                          }}>
                            修改密码
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a href="javascript:void(0)" onClick={
                            () => {
                              window._api.userLogout().then(res => {
                                sessionStorage.clear()
                                window.location.href = `${res}/#/auth?logout=ok`
                              })
                            }
                          }>
                            退出登录
                          </a>
                        </Menu.Item>
                      </Menu>
                    )}>
                      <a className="ant-dropdown-link" href="javascript:void(0)">
                        {name} <Icon type="down" />
                      </a>
                    </Dropdown>
                  </Col>
                  {levelName && <Col>{levelName}</Col>}
                  {/* <Col><Button style={{ padding: 0 }} type="link" onClick={
                    () => {
                      _this.props.loginOut()
                    }
                  }>退出</Button></Col> */}
                </Row>
              </Col>
            </Row>
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
          <Modal
            destroyOnClose
            title="修改密码"
            visible={this.state.modalVisible}
            onOk={() => {
              if (this.state.password.length < 3) {
                message.warning('至少三位密码');
                return;
              }
              window._api.userPass(id, this.state.password).then(res => {
                if (res.code == "0") {
                  message.success('修改成功');
                  this.setState({
                    password: '',
                    modalVisible: false
                  })
                }
              })
            }}
            onCancel={() => {
              this.setState({
                modalVisible: false
              })
            }}
          >
            {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原密码">
        {form.getFieldDecorator('oldPassword', {
          rules: [{ required: true, message: '密码必须4到12位，且不能出现空格', pattern: /^[^\s]{4,12}$/ }],
        })(<Input.Password placeholder="请输入原密码" />)}
      </FormItem> */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="新密码">
              <Input.Password onChange={(e) => {
                this.setState({
                  password: e.target.value
                })
              }} placeholder="请输入新密码" />
            </FormItem>
            {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
        {form.getFieldDecorator('rePassword', {
          rules: [{ required: true, message: '密码必须4到12位，且不能出现空格', pattern: /^[^\s]{4,12}$/ }],
        })(<Input.Password placeholder="请再次输入新密码" />)}
      </FormItem> */}
          </Modal>
        </Layout>
      </Layout>
    );
  }
}