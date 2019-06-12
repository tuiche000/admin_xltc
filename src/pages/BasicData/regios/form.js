import React from 'react'
import { Form, Input, Select, Button, InputNumber, Icon, Modal } from 'antd';
import { Map } from 'react-amap';

const { TextArea } = Input;

// eslint-disable-next-line
@Form.create()
export default class regiosForm extends React.Component {
  state = {
    ID: "",
    visible: true,
    mapVisble: true,
    formData: {
      position: {
        lat: '',
        lng: '',
      }
    }
  };

  fnToggleMap = () => {
    this.setState((state) => {
      return {
        mapVisble: !state.mapVisble
      }
    })
  }

  fnRegionAdd = async (opt, query) => {
    let data = await window._api.regionAdd(opt, query)
    console.log(data)
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
        console.log(mapInstance);
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
              rules: [{ required: true, message: '请输入内容', whitespace: true }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属平台" hasFeedback>
            {getFieldDecorator('regionType', { rules: [{ required: true, message: '请输入内容' }], initialValue: initialValue.regionType })(
              <Select >
                <Option value="CITY">省/市</Option>
                <Option value="COUNTY">区/县</Option>
                <Option value="VILLAGE">街/村</Option>
                <Option value="OTHERS">其他</Option>
              </Select>)}
          </Form.Item>
          <Form.Item label="坐标">
            {getFieldDecorator('postion', {
              initialValue: initialValue.postion
            })(
              <Input style={{ width: '100%' }} addonAfter={<Icon type="environment" onClick={this.fnToggleMap} theme="filled" />} />
            )}
          </Form.Item>
          <Form.Item label="区划代码">
            {getFieldDecorator('areacode', {
              rules: [{ required: true, message: '请输入内容' }],
              initialValue: initialValue.areacode
            })(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="邮编">
            {getFieldDecorator('postcode', {initialValue: initialValue.postcode})(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="级别">
            {getFieldDecorator('level', {initialValue: initialValue.level})(<InputNumber min={1} max={10} initialValue={3} />)}
          </Form.Item>
          <Form.Item label="显示顺序">
            {getFieldDecorator('displayOrder', {initialValue: initialValue.displayOrder})(<InputNumber min={1} max={10} initialValue={3} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}