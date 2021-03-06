import React, { Component } from 'react';
import { Modal, Button, Form, Input, Icon, message as Message, Row, Typography, Col } from 'antd';
import {
  withRouter
} from "react-router-dom"
import { connect } from 'react-redux';
import { _POST } from '@/utils/fetch'
import fang from '@/assets/fang.png'

import fetchJson from '../utils/fetch';
import Register from './Register'

import { setLogin } from '../actions';
const { Title } = Typography

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
  //     sessionStorage.login = true;

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
      this.props.history.push('/home', {});
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      
      if (!err) {
        values.clientId = process.env.CLIENTID
        values.clientSecret = process.env.CLIENTSECRET
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
        sm: { span: 6 },
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
          offset: 6,
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
        <Row align="middle" type="flex" justify="center" gutter={10} style={{ marginBottom: 50 }}>
          <Col><img src={fang} /></Col>
          <Col>{type == 'login' ? (<Title level={2} style={{ marginBottom: 0, color: '#e67e22' }}>登录</Title>) : (<Title style={{ marginBottom: 0, color: '#e67e22' }} level={2}>注册</Title>)}</Col>
          <Col><img src={fang} /></Col>
        </Row>
        {
          type == 'login' ? <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名" hasFeedback>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入内容' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  
                />,
              )}
            </Form.Item>
            <Form.Item label="登录密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入内容',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button style={{ background: '#e67e22', color: '#fff' }} size="large" block htmlType="submit">
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