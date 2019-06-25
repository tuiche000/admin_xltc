import React from 'react'
import { Form, Input, Select, Modal } from 'antd';
import { Map } from 'react-amap';

// eslint-disable-next-line
@Form.create()
export default class regiosForm extends React.Component {
  state = {
    ID: "",
    visible: true,
  };

  componentDidMount() {
  }

  render() {
    const { visible, onCancel, onCreate, form, initialValue } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
  
    return (
      <Modal
        visible={visible}
        // title="Create a new collection"
        // okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        centered={true}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="角色名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入内容,不得大于20个字符', whitespace: true, max: 20 }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="角色简介">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入内容,不得大于64个字符', whitespace: true, max: 64 }],
              initialValue: initialValue.description
            })(<Input />)}
          </Form.Item>
          <Form.Item label="角色类型">
            {getFieldDecorator('roadRank', {
              rules: [{ required: true, message: '请输入内容' }],
              initialValue: initialValue.roadRank
            })(<Select >
              <Option value="FIRST">一级踏查人</Option>
              <Option value="SECOND">二级踏查人</Option>
              <Option value="THIRD">三级踏查人</Option>
              <Option value="FOURTH">问题处置员</Option>
              <Option value="FIFTH">问题协调员</Option>
            </Select>)}
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}