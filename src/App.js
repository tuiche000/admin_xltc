/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { message as Message } from 'antd'
const queryString = require('query-string');
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import { setLogin } from './actions';

import Layout from './layout/index';
import Auth from '@/pages/Auth';
// import Home from '@/pages/Home';

import api from './api/index'
window._api = api

import './app.css'

@connect((state, props) => Object.assign({}, props, state), {
  setLogin
})
export default class App extends Component {
  constructor(...args) {
    super(...args);
  }

  checkLogin() {
    
    let token = JSON.parse(sessionStorage.getItem('token'))
    let login = sessionStorage.getItem('login')
    let Plogin = this.props.admin.login
    if (!Plogin) {
      if (!login) {
        // 缓存和状态都没有登录信息滚去登录吧！
        // if (this.props.location.pathname != '/') {
        //   Message.warning('未登录')
        // }
        window.location.href = `http://product.loiot.com/`
        // window.location.href = `localhost:8081`
      }
      else {
        // 状态没有登录缓存有登录说明登录了但是刷新页面了
        if (!token) {
          // 缓存登录过但是没token？？？？什么鬼
          if (this.props.location.pathname != '/') {
            Message.warning('未登录')
          }
          window.location.href = `http://product.loiot.com`
          // window.location.href = `localhost:8081`
        }
        else {
          // 缓存里有token也有登录状态
          this.props.setLogin(token);
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.props.location.pathname != '/' || this.props.location.pathname != '/auth') {
      // let token = {
      //   access_token: 'ZG25CAmiUklUBe5byYxHOb294rvU2KtV'
      // }
      // sessionStorage.setItem('login', true)
      // sessionStorage.setItem('token', JSON.stringify(token))
      this.checkLogin();
    }
  }

  componentDidMount() {
    if (this.props.location.pathname != '/' || this.props.location.pathname != '/auth') {
      this.checkLogin();
    }
  }

  render() {
    return (
      <div>
        {
          this.props.location.pathname == '/' || this.props.location.pathname == '/auth' ? <Route component={Auth}></Route> : <Layout {...this.props} />
        }
      </div>
    );
  }
}
