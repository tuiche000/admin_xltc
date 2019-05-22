import React from 'react'
import { Form, Input, Radio } from 'antd';


// eslint-disable-next-line
class regiosForm extends React.Component {
  state = {
    visible: true,
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="vertical">
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title of collection!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description')(<Input type="textarea" />)}
        </Form.Item>
        <Form.Item className="collection-create-form_last-form-item">
          {getFieldDecorator('modifier', {
            initialValue: 'public',
          })(
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(regiosForm)

export default CollectionCreateForm