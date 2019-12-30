import React from "react";
import './common.css';
import logo from '@/assets/images/logo.png';
import { Divider, Row, Col } from 'antd';

export default class Web extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <Row type="flex" justify="space-between" align="bottom">
            <Col>
              <div className="logo">
                <div>
                  <img width="300" height="50" src={logo}></img>
                </div>
              </div>
            </Col>
            <Col>
              <div className="menu">
              <Row gutter={30} type="flex">
                <Col>
                  <a className="menu-active">首页</a>
                </Col>
                <Col>
                  <a>应用案例</a>
                </Col>
                <Col>
                  <a>使用方式</a>
                </Col>
                <Col>
                  <a>技术支持</a>
                </Col>
                <Col>
                  <a>版本日志</a>
                </Col>
              </Row>
              </div>
            </Col>
            <Col>
              <div className="nav_right">
                <a>登录</a>
                <Divider type="vertical"></Divider>
                <a>注册</a>
              </div>
            </Col>
          </Row>
        </nav>
      </header>
    );
  }
}