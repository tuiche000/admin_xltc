import React from 'react';
import {
  Form,
  Input,
  Cascader,
  Select,
  Button,
  AutoComplete,
  message as Message,
  Row, Col,
} from 'antd';
import { _POST } from '@/utils/fetch'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@Form.create()
export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    regoinOpt: [
    ],
    step: 1, // 注册的步骤
    step1Values: {}, // step1的数据
  };

  register = async (json) => {
    let data = await _POST('api/oss/user/register', json)
    if (data) {
      Message.success('注册成功');
      this.props.form.resetFields()
      this.setState({
        step1Values: {},
        step: 1,
      })
      this.props.fnCancel()
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        if (this.state.step == 1) {
          this.setState({
            step: 2,
            step1Values: values,
          })
          return
        }
        let regionId = values.regionId
        values.regionId = regionId[regionId.length - 1]
        // values.clientId = "5IxFXXu4sgaz6zHrSgUZ8O"
        // values.clientSecret = "VwdtfBwbbhMPmU7B7lEid3rs8U8XR0XA"
        values.clientId = "2RLBDDGZd4rmQRkkRvHSZp"
        values.clientSecret = "Oo6zHfT68VTzGF05g2u1uS6zVBPbcigK"
        this.register({...values, ...this.state.step1Values})
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  fnRegionFirstlevel = async () => {
    let data = await window._api.regionFirstlevel()
    data.map(item => {
      item.isLeaf = !item.hasChildren
      item.label = item.name
      item.value = item.id
    })
    this.setState({
      regoinOpt: data
    })
  }

  fnRegionChildren = async (id) => {
    let data = await window._api.regionChildren(id)
    return data
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    let childrenData = await this.fnRegionChildren(targetOption.id)
    childrenData.map(item => {
      item.isLeaf = !item.hasChildren
      item.label = item.name
      item.value = item.id
    })

    targetOption.loading = false;
    targetOption.children = childrenData

    this.setState({
      options: [...this.state.regoinOpt],
    });
  };

  fnNext = () => {
    this.setState({
      step: 2,
    })
  }

  fnPrev = () => {
    this.setState({
      step: 1,
    })
  }

  componentDidMount() {
    this.fnRegionFirstlevel()
  }

  render() {
    const _this = this
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, regoinOpt, step } = this.state;

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

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {step == 1 && <div>
          <Form.Item label="手机号码">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input style={{ width: '100%' }} />)}
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
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
        </div>
        }
        {
          step == 2 && <div>
            <Form.Item
              label="真实姓名"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your realname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label="身份证号"
            >
              {getFieldDecorator('idcard', {
                rules: [{ required: true, message: 'Please input your idcard!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="所在地区">
              {getFieldDecorator('regionId', {
                rules: [
                  { type: 'array', required: true, message: 'Please select your regoin!' },
                ],
              })(<Cascader
                options={regoinOpt}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect />)}
            </Form.Item>
            <Form.Item
              label="所在单位"
            >
              {getFieldDecorator('departmentName', {
                rules: [{ required: true, message: '请填写所在单位!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="使用邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label="企业信用编号"
            >
              {getFieldDecorator('taxcode', {
                rules: [{ required: true, message: '请填写企业信用编号!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
          </div>
        }


        <Form.Item {...tailFormItemLayout}>
          {
            step == 1 && (
              <Button style={{ background: '#e67e22', color: '#fff' }} size="large" block htmlType="submit">
                下一步
              </Button>
            )
          }
          {
            step == 2 && (
              <Row>
                <Col span={12}>
                  <Button onClick={this.fnPrev} style={{ color: '#e67e22', borderColor: '#e67e22' }} size="large" block>
                    上一步
              </Button>
                </Col>
                <Col span={12}>
                  <Button style={{ background: '#e67e22', color: '#fff', marginLeft: 10 }} size="large" htmlType="submit" block>注册</Button>
                </Col>


              </Row>
            )
          }
        </Form.Item>
      </Form>
    );
  }
}