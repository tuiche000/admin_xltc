import React from 'react'
import { Form, Input, Select, Button, InputNumber, Switch, Modal } from 'antd';
import { Map } from 'react-amap';

// eslint-disable-next-line
class regiosForm extends React.Component {
  state = {
    ID: "",
    visible: true,
    mapVisble: true,
  };

  fnToggleMap = () => {
    this.setState((state) => {
      return {
        mapVisble: !state.mapVisble
      }
    })
  }

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
    const position = { longitude: 120, latitude: 32 }
    const amapkey = "e6356bced344d01851e9d87b2ad188fe"
    const mapEvents = {
      created: (mapInstance) => {

      },
      click: (params) => {
        const { lat, lng } = params.lnglat
        this.props.form.setFieldsValue({
          postion: `${lat},${lng}`
        })
      },
    }
    return (
      <Modal
        visible={visible}
        // title="Create a new collection"
        // okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        centered={true}
      >
        {
          !this.state.mapVisble && <div style={{ width: '100%', height: '400px' }}>
            <Map center={position} zoom={5} amapkey={amapkey} events={mapEvents} />
          </div>

        }
  
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
            label={
              <span>
                名字
            </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入内容,长度不超过20个字符', whitespace: true, max: 20 }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="部门类型" hasFeedback>
            {getFieldDecorator('departmentType', { rules: [{ required: true, message: '请输入内容' }], initialValue: initialValue.departmentType })(
              <Select >
                <Option value="CITY">市级</Option>
                <Option value="COUNTY">区县级</Option>
                <Option value="TOWNSHIP">街乡镇</Option>
                <Option value="COMMUNITY">社区级</Option>
              </Select>)}
          </Form.Item>
          
          {/* <Form.Item label="企业信用编号">
            {getFieldDecorator('taxcode', {
              initialValue: initialValue.taxcode
            })(<Input style={{ width: '100%' }} />)}
          </Form.Item> */}
          {/* <Form.Item label="行政区域" hasFeedback>
            {getFieldDecorator('regionType', { rules: [{ required: true, message: '请输入内容' }], initialValue: initialValue.departmentType })(
              <Select >
                <Option value="CITY">省/市</Option>
                <Option value="COUNTY">区/县</Option>
                <Option value="VILLAGE">街/村</Option>
                <Option value="OTHERS">其他</Option>
              </Select>)}
          </Form.Item> */}
          {/* <Form.Item label="邮编">
            {getFieldDecorator('postcode', { initialValue: initialValue.postcode })(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="启用">
            {getFieldDecorator('enabled', {  })(<Switch />)}
          </Form.Item>
          <Form.Item label="显示顺序">
            {getFieldDecorator('displayOrder', { initialValue: initialValue.displayOrder })(<InputNumber min={1} max={10} initialValue={3} />)}
          </Form.Item> */}
        </Form>
      </Modal>

    );
  }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(regiosForm)

export default CollectionCreateForm