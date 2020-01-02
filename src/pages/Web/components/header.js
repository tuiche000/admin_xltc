import React from "react";
import './common.css';
import logo from '@/assets/images/logo.png';
import { Divider, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

export default class Web extends React.Component {
  render() {
    return (
      <header className="Web_header">
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
                    <Link to='/web/home' className="menu-active">首页</Link>
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
                <Link to='/web/login' className="menu-active">登录</Link>
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