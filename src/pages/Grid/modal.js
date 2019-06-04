import React from 'react'
import { Modal, Button, Form, Input, Switch, Select, TreeSelect } from 'antd';
import Map from './map'

const TreeNode = TreeSelect.TreeNode;

@Form.create()
export default class GridModal extends React.Component {
  state = {
    edit: true, // 是否允许编辑地图上的线
    gData: [], // 责任部门tree数据
    regionData: [], // 责任部门tree数据
    value: undefined, // 责任部门tree值
    regionValue: undefined, // 责任部门tree值
  }

  // map组件的编辑/取消编辑
  fnTogglePolyline = () => {
    this.setState({
      edit: !this.state.edit,
    });
  }

  // tree异步加载数据
  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.dataRef.hasChildren) {
        window._api.departmentId(treeNode.props.dataRef.id).then(arr => {
          let newArr = arr.map(item => {
            item.isLeaf = false
            return item
          })
          treeNode.props.dataRef.children = newArr
          this.setState({
            gData: [...this.state.gData],
          });
          console.log(arr)
          resolve();
          return;
        })
      } else {
        resolve();
      }
    });

  // 行政区域tree异步加载数据
  regoinOnLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.dataRef.hasChildren) {
        window._api.regionChildren(treeNode.props.dataRef.id).then(arr => {
          let newArr = arr.map(item => {
            item.isLeaf = false
            return item
          })
          treeNode.props.dataRef.children = newArr
          this.setState({
            gData: [...this.state.gData],
          });
          console.log(arr)
          resolve();
          return;
        })
      } else {
        resolve();
      }
    });

  // 获取第一层的tree数据
  fnfirstlevel = async () => {
    let data = await window._api.departmentFirstlevel()
    this.setState({
      tableData: data,
      gData: data
    })
  }

  // 行政区域获取第一层tree数据
  regionFirstlevel = async () => {
    let data = await window._api.regionFirstlevel()
    this.setState({
      regionData: data,
    });
  }

  // 根据主键获取下一级责任部门列表
  fnGetChildren = async (arr, e) => {
    console.log(e)
    let data = await window._api.departmentId(arr[0])
    this.setState({
      selectedKeys: arr,
      selected: e.selectedNodes[0].props.dataRef,
    })
  }

  // 行政区域根据主键获取下一级行政区域列表
  getRegionChildren = async (selectedKeys, e) => {
    let data = await window._api.regionChildren(selectedKeys)
    this.setState({
      TablePropData: data,
      selectedKeys: selectedKeys
    })
  }

  // 加载tree节点
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode value={item.name} title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.name} title={item.name} isLeaf={item.hasChildren ? false : true} key={item.id} dataRef={item} />;
    })
  };

  // 行政区域加载tree节点
  regionRenderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode value={item.name} title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.name} title={item.name} isLeaf={item.hasChildren ? false : true} key={item.id} dataRef={item} />;
    })
  };

  // 选中tree节点
  treeonChange = (value, label, extra) => {
    console.log(value);
    this.setState({ value });
  };
  
  // region选中tree节点
  regionTreeonChange = (value, label, extra) => {
    console.log(value);
    this.setState({ regionValue: value });
  };

  componentDidMount() {
    this.fnfirstlevel()
    this.regionFirstlevel()
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
              rules: [{ required: true, message: 'Please input' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="路型等级">
            {type === 'detail' ? '乡道' : getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input' }],
            })(
              <Select placeholder="Please select a regionType">
                <Option value="CITY">国道</Option>
                <Option value="COUNTY">省道</Option>
                <Option value="VILLAGE">县道</Option>
                <Option value="OTHERS">乡道</Option>
                <Option value="zygl">专用公路</Option>
                <Option value="sjsq">石景山区</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="责任路长">
            {type === 'detail' ? '张二明' : getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input' }],
            })(
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
          <Form.Item label="责任部门">
            {type === 'detail' ? '责任部门' : getFieldDecorator('zrbm', {
              rules: [{ required: true, message: 'Please input' }],
            })(
              <TreeSelect
                loadData={this.onLoadData}
                // onSelect={this.getRegionChildren}
                showSearch
                style={{ width: 300 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                onChange={this.treeonChange}
              >
                {this.renderTreeNodes(this.state.gData)}
              </TreeSelect>
            )}
          </Form.Item>
          <Form.Item label="行政区域">
            {type === 'detail' ? '昂昂溪区' : getFieldDecorator('xzqy', {
              rules: [{ required: true, message: 'Please input' }],
            })(
              <TreeSelect
                loadData={this.regoinOnLoadData}
                // onSelect={this.getRegionChildren}
                showSearch
                style={{ width: 300 }}
                value={this.state.regionValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                onChange={this.treeonChange}
              >
                {this.regionRenderTreeNodes(this.state.regionData)}
              </TreeSelect>
            )}
          </Form.Item>
          <Form.Item label="是否有地图">
            {type === 'detail' ? '是' : getFieldDecorator('enabled', {
              rules: [{ required: true, message: 'Please input' }],
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="线路坐标">
            {type === 'detail' ? (
              <Map
                latlngs={[{ latitude: 40.016243, longitude: 116.47498 }, { latitude: 40.016913, longitude: 116.47491 }, { latitude: 40.016921, longitude: 116.474712 }]}
              />
            ) : getFieldDecorator('postion', {})(
              <Map
                togglePolyline={this.fnTogglePolyline}
                // edit={this.state.edit}
                type={this.props.type}
                latlngs={[{ latitude: 40.016243, longitude: 116.47498 }, { latitude: 40.016913, longitude: 116.47491 }, { latitude: 40.016921, longitude: 116.474712 }]}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}