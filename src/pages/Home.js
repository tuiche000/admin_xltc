import React, { Component } from 'react';
import { Row, Col, Button, Input, message as Message, Typography } from 'antd'
import { _POST } from '@/utils/fetch'
import { connect } from 'react-redux';
import wecando from '@/assets/wecando.png'

import Login from './Login'

const Search = Input.Search
const { Title } = Typography;

import { loginOut } from '../actions';

import './Home.css'

@connect((state, props) => Object.assign({}, props, state), { loginOut })
export default class Home extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      type: 'login',
      visible: false,
    };
  }

  fnFeedback = async (json) => {
    let data = await _POST('api/v1/feedback', json, {
      "channel": "WEBSITE"
    })
    const { code, message, status } = data
    if (code == '0') {
      Message.success('留言成功');
    }
  }

  render() {
    let _this = this
    let { visible, type } = this.state
    return (
      <div id="home">
        <header >
          <Row style={{ width: '1024px', marginTop: 30 }} type="flex" justify="space-between">
            <Col span={12}>
              <Title level={2}>市政管理巡查责任网格平台</Title>
            </Col>
            <Col span={12}>
              {
                this.props.admin.login ? (
                  <Row type="flex" justify="end">
                    <Button ghost onClick={() => {
                      this.props.history.push('/grid', {});
                    }}>进入后台</Button>
                    <Button style={{ marginLeft: 10 }} ghost onClick={() => {
                      _this.props.loginOut()
                    }}>退出</Button>
                  </Row>
                ) : <Row type="flex" justify="end">
                    <Button ghost onClick={() => {
                      _this.setState({
                        type: 'login',
                        visible: true,
                      })
                    }}>登录</Button>
                    <Button ghost style={{ marginLeft: 10 }} onClick={() => {
                      _this.setState({
                        type: 'register',
                        visible: true,
                      })
                    }}>注册</Button>
                  </Row>
              }
            </Col>
            <div className="header_div">
              <Title level={3}>网格精细化治理城市的探索与实践</Title>
              <p style={{fontSize:18}}>
                首家路长责任制度软件实践
              <br></br>
                保障国家责任制度落地
              </p>
              <div>
                <Button ghost size="large" onClick={() => {
                  this.props.admin.login ? this.props.history.push('/grid', {}) : _this.setState({
                    type: 'login',
                    visible: true,
                  })
                }}>首家路长责任制的软件化实施</Button>
              </div>
            </div>
          </Row>

        </header>
        <aside>
          <section className="wecando">
            <img src={wecando} width="1024px"></img>
          </section>
          <section className="msgBoard">
            <Row>
              <Col>
                <Title level={4}>你有什么想对我们说的么？</Title>
                <Search
                  style={{ width: 300 }}
                  
                  enterButton="联系我们"
                  size="large"
                  onSearch={value => {
                    _this.fnFeedback({
                      "context": value
                    })
                  }}
                />
              </Col>
            </Row>
          </section>
        </aside>
        <footer>
          <Row>
            <Col>
              京ICP备14016868-1&nbsp;&nbsp;&nbsp;工商网监认证
            </Col>
          </Row>
        </footer>
        <Login
          fnCancel={() => {
            this.setState({
              visible: false
            })
          }}
          type={type}
          visible={visible}
        ></Login>
      </div>
    );
  }
}