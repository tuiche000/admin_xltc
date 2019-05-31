import React, { Component } from 'react';

import { connect } from 'react-redux';

import Dialog from '../components/Dialog';
import Form from '../components/Form';

import fetchJson from '../utils/fetch';

import { setLogin } from '../actions';

class Login extends Component {
  constructor(...args) {
    super(...args);
  }

  async login() {
    let form = this.refs.form1.getFormData();

    try {
      await fetchJson('admin/login', {
        method: 'POST',
        body: form
      });

      this.props.setLogin(true);
      localStorage.login = true;

      this.props.history.push('/', {});
    } catch (e) {
      alert('登录失败: ' + e);
    }
  }

  render() {
    return (
      <Dialog title="登录" close_btn={false}>
        <Form
          ref="form1"
          fields={[
            { name: 'username', type: 'text', label: '用户名', placeholder: '请输入用户名' },
            { name: 'password', type: 'password', label: '密码', placeholder: '请输入密码' },
          ]}

          btns={[
            { text: '登录', type: 'primary', onClick: this.login.bind(this) },
          ]}
        />
      </Dialog>
    );
  }
}

//export default Login;
export default connect((state, props) => Object.assign({}, props, state), {
  setLogin
})(Login);
