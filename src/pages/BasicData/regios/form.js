import React from 'react'
import { Form, Input, Select, Button, InputNumber, Icon, Modal } from 'antd';
import { Map } from 'react-amap';

const { TextArea } = Input;

// eslint-disable-next-line
class regiosForm extends React.Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // values.parentId = this.props.location.query.id
        this.fnRegionAdd(values, {
          parentId: this.props.location.query.id
        })
      }
    });

  }

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
    // console.log(this.props.location)
    // this.props.location.hasOwnProperty('query') && this.setState({
    //   id: this.props.location.query.id
    // })
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
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
        // onOk={onCreate}
        footer={null}
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
              rules: [{ required: true, message: '请输入名字!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属平台" hasFeedback>
            {getFieldDecorator('regionType', { rules: [{ required: true, message: '请选择regionType!' }], })(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">省/市</Option>
                <Option value="COUNTY">区/县</Option>
                <Option value="VILLAGE">街/村</Option>
                <Option value="OTHERS">其他</Option>
              </Select>)}
          </Form.Item>
          <Form.Item label="坐标">
            {getFieldDecorator('postion')(
              <Input style={{ width: '100%' }} addonAfter={<Icon type="environment" onClick={this.fnToggleMap} theme="filled" />} />
            )}
          </Form.Item>
          <Form.Item label="区划代码">
            {getFieldDecorator('areacode', {
              rules: [{ required: true, message: 'Please input 区划代码!' }],
            })(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="邮编">
            {getFieldDecorator('bbb')(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="级别">
            {getFieldDecorator('ccc')(<InputNumber min={1} max={10} initialValue={3} />)}
          </Form.Item>
          <Form.Item label="显示顺序">
            {getFieldDecorator('displayOrder')(<InputNumber min={1} max={10} initialValue={3} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(regiosForm)

export default CollectionCreateForm