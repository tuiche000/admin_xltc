import React, { Component } from 'react';
import { Modal, Button, Form, Input, Icon, message as Message } from 'antd';
import {
  withRouter
} from "react-router-dom"
import { connect } from 'react-redux';
import { _POST } from '@/utils/fetch'

import fetchJson from '../utils/fetch';
import Register from './Register'

import { setLogin } from '../actions';

@connect((state, props) => Object.assign({}, props, state), {
  setLogin
})
@withRouter
@Form.create()
export default class Login extends Component {
  constructor(...args) {
    super(...args);
  }

  // async login() {
  //   let form = this.refs.form1.getFormData();

  //   try {
  //     await fetchJson('admin/login', {
  //       method: 'POST',
  //       body: form
  //     });

  //     this.props.setLogin(true);
  //     localStorage.login = true;

  //     this.props.history.push('/', {});
  //   } catch (e) {
  //     alert('登录失败: ' + e);
  //   }
  // }
  login = async (json) => {
    let data = await _POST('api/oss/user/login', json)
    
    if (data) {
      Message.success('登录成功');
      this.props.fnCancel()
      this.props.setLogin(data);
      this.props.history.push('/grid', {});
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        values.clientId = "5IxFXXu4sgaz6zHrSgUZ8O"
        values.clientSecret = "VwdtfBwbbhMPmU7B7lEid3rs8U8XR0XA"
        // values.clientId = "2RLBDDGZd4rmQRkkRvHSZp"
        // values.clientSecret = "Oo6zHfT68VTzGF05g2u1uS6zVBPbcigK"
        this.login(values)
      }
    });
  };

  render() {
    const { form, type } = this.props
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Modal
        title={null}
        visible={this.props.visible}
        onCancel={this.props.fnCancel}
        footer={null}
      >
        <h2>{type == 'login' ? '登录' : '注册'}</h2>
        {
          type == 'login' ? <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名" hasFeedback>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item label="登录密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                登录
          </Button>
            </Form.Item>
          </Form> : <Register fnCancel={
            this.props.fnCancel
          }></Register>
        }
      </Modal >
    );
  }
}