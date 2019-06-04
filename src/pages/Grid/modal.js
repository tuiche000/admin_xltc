import React from 'react'
import { Modal, Button, Form, Input, Switch, Select } from 'antd';
import Map from './map'

@Form.create()
export default class GridModal extends React.Component {
  state = {
    edit: true, // 是否允许编辑地图上的线
  }

  // map组件的编辑/取消编辑
  fnTogglePolyline = () => {
    this.setState({
      edit: !this.state.edit,
    });
  }

  render() {
    const { form, type } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Modal
        title={true ? `查看责任网络` : `编辑责任网络`}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item label="名字">
            {type === 'detail' ? '第一路和第二路' : getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="路型等级">
            {type === 'detail' ? '乡道' : getFieldDecorator('description')(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">国道</Option>
                <Option value="COUNTY">省道</Option>
                <Option value="VILLAGE">县道</Option>
                <Option value="OTHERS">乡道</Option>
                <Option value="CITY">专用公路</Option>
                <Option value="COUNTY">石景山区</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="责任路长">
            {type === 'detail' ? '张二明' : getFieldDecorator('description')(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">国道</Option>
                <Option value="COUNTY">省道</Option>
                <Option value="VILLAGE">县道</Option>
                <Option value="OTHERS">乡道</Option>
                <Option value="CITY">专用公路</Option>
                <Option value="COUNTY">石景山区</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="市一级体育部门">
            {type === 'detail' ? '乡道' : getFieldDecorator('description')(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">国道</Option>
                <Option value="COUNTY">省道</Option>
                <Option value="VILLAGE">县道</Option>
                <Option value="OTHERS">乡道</Option>
                <Option value="CITY">专用公路</Option>
                <Option value="COUNTY">石景山区</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="行政区域">
            {type === 'detail' ? '昂昂溪区' : getFieldDecorator('description')(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">国道</Option>
                <Option value="COUNTY">省道</Option>
                <Option value="VILLAGE">县道</Option>
                <Option value="OTHERS">乡道</Option>
                <Option value="CITY">专用公路</Option>
                <Option value="COUNTY">石景山区</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="是否有地图">
            {type === 'detail' ? '是' : getFieldDecorator('enabled', {})(<Switch />)}
          </Form.Item>
          <Form.Item label="线路坐标">
            {type === 'detail' ? (
              <Map
                latlngs={[{ latitude: 40.016243, longitude: 116.47498 }, { latitude: 40.016913, longitude: 116.47491 }, { latitude: 40.016921, longitude: 116.474712 }]}
              />
            ) : getFieldDecorator('postion', {})(
              <Map
                togglePolyline={this.fnTogglePolyline}
                edit={this.state.edit}
                latlngs={[{ latitude: 40.016243, longitude: 116.47498 }, { latitude: 40.016913, longitude: 116.47491 }, { latitude: 40.016921, longitude: 116.474712 }]}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}