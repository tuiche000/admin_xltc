/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { message as Message } from 'antd'
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import { setLogin } from './actions';

import Layout from './layout/index';
import Home from '@/pages/Home';
import Web from '@/pages/Web/index';

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
        this.props.history.push('/', {});
      }
      else {
        // 状态没有登录缓存有登录说明登录了但是刷新页面了
        if (!token) {
          // 缓存登录过但是没token？？？？什么鬼
          if (this.props.location.pathname != '/') {
            Message.warning('未登录')
          }
          this.props.history.push('/', {});
        }
        else {
          // 缓存里有token也有登录状态
          this.props.setLogin(token);
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.props.location.pathname != '/') {
      // this.checkLogin();
    }
  }

  componentDidMount() {
    // this.checkLogin();
  }

  render() {
    return (
      <div>
        <Route path="/web" component={Web}></Route>
        {/* {
          this.props.location.pathname == '/' ? <Route path="/home" component={Home}></Route> : <Layout {...this.props} />
        } */}
      </div>
    );
  }
}
