import React from 'react'
import { Form, Input, Select, TreeSelect, Switch, Modal } from 'antd';
import { Map } from 'react-amap';

const TreeNode = TreeSelect.TreeNode;

// eslint-disable-next-line
@Form.create()
export default class regiosForm extends React.Component {
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
      >
        {
          !this.state.mapVisble && <div style={{ width: '100%', height: '400px' }}>
            <Map center={position} zoom={5} amapkey={amapkey} events={mapEvents} />
          </div>

        }
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名字">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名字!', whitespace: true }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="路型等级" hasFeedback>
            {getFieldDecorator('departmentType', { initialValue: initialValue.regionType })(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">国道</Option>
                <Option value="COUNTY">省道</Option>
                <Option value="VILLAGE">县道</Option>
                <Option value="OTHERS">乡道</Option>
                <Option value="CITY">专用公路</Option>
                <Option value="COUNTY">石景山区</Option>
              </Select>)}
          </Form.Item>
          <Form.Item label="行政区域" hasFeedback>
            {getFieldDecorator('regionType', { rules: [{ required: true, message: '请选择regionType!' }], initialValue: initialValue.departmentType })(
              <TreeSelect
                loadData={this.onLoadData}
                onSelect={this.getRegionChildren}
                showSearch
                style={{ width: 300 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                onChange={this.treeonChange}
              >
                {/* {this.renderTreeNodes(this.state.gData)} */}
              </TreeSelect>
            )}
          </Form.Item>
          <Form.Item label="是否有地图">
            {getFieldDecorator('enabled', {})(<Switch />)}
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}