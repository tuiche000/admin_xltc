import React from 'react'
import { Modal, Button, Form, Input, Switch, Select, TreeSelect } from 'antd';
import Map from './map'

const TreeNode = TreeSelect.TreeNode;
const { Option } = Select;

let mapVisible = true
@Form.create({
  onValuesChange(props, changedValues, allValues) {
    mapVisible = changedValues.mapabled
    // if (changedValues.mapabled) mapVisible = changedValues.mapabled
  }
})
export default class GridModal extends React.Component {
  state = {
    edit: true, // 是否允许编辑地图上的线
    gData: [], // 责任部门tree数据
    regionData: [], // 责任部门tree数据
    value: undefined, // 责任部门tree值
    regionValue: undefined, // 责任部门tree值
    mapVisible: false, // 地图是否显示
    userOpt: [], // 踏查人列表selet选项
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
          <TreeNode value={item.id} title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.id} title={item.name} isLeaf={item.hasChildren ? false : true} key={item.id} dataRef={item} />;
    })
  };

  // 行政区域加载tree节点
  regionRenderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode value={item.id} title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.id} title={item.name} isLeaf={item.hasChildren ? false : true} key={item.id} dataRef={item} />;
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

  // 获取踏查人列表
  fnUserList = async () => {
    let data = await window._api.userList()
    this.setState({
      userOpt: data.result
    })
  }

  // 保存地图坐标
  mapSave = (latlngs) => {
    console.log(latlngs)
    this.props.form.setFieldsValue({
      latlngs
    })
  }

  componentDidMount() {
    this.fnfirstlevel()
    this.regionFirstlevel()
    this.fnUserList()
  }

  render() {
    const { form, type, initialValue } = this.props;
    // mapVisible = initialValue.mapabled
    const { userOpt } = this.state
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
        title={type === 'add' ? `添加责任网络` : `编辑责任网络`}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item label="名字">
            {type === 'detail' ? '第一路和第二路' : getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input' }],
              initialValue: initialValue.name,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="路型等级">
            {type === 'detail' ? '乡道' : getFieldDecorator('roadType', {
              rules: [{ required: true, message: 'Please input' }],
              initialValue: initialValue.roadType,
            })(
              <Select placeholder="Please select">
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
            {type === 'detail' ? '张二明' : getFieldDecorator('users', {
              rules: [{ required: true, message: 'Please input' }],
              initialValue: initialValue.users,
            })(
              <Select mode="multiple" placeholder="Please select">
                {
                  userOpt.map((item, index) => {
                    return <Option key={item.id}>{item.name}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="责任部门">
            {type === 'detail' ? '责任部门' : getFieldDecorator('departments', {
              rules: [{ required: true, message: 'Please input' }],
              initialValue: initialValue.departments,
            })(
              <TreeSelect
                loadData={this.onLoadData}
                // onSelect={this.getRegionChildren}
                showSearch
                multiple
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
            {type === 'detail' ? '昂昂溪区' : getFieldDecorator('region', {
              rules: [{ required: true, message: 'Please input' }],
              initialValue: initialValue.region,
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
            {type === 'detail' ? '是' : getFieldDecorator('mapabled', {
              // rules: [{ required: true, message: 'Please input' }],
              valuePropName: 'checked',
              initialValue: initialValue.mapabled || true,
            })(<Switch />)}
          </Form.Item>
          {
            mapVisible && <Form.Item label="线路坐标">
              {
                getFieldDecorator('latlngs', {
                  initialValue: initialValue.latlngs,
                })(
                  <Map
                    togglePolyline={this.fnTogglePolyline}
                    // edit={this.state.edit}
                    save={(latlngs) => {
                      console.log(latlngs)
                      this.mapSave(latlngs)
                    }}
                    type={this.props.type}
                    latlngs={initialValue.latlngs}
                  />
                )
              }
              {/* {type === 'detail' ? (
              <Map
                latlngs={[{ latitude: 40.016243, longitude: 116.47498 }, { latitude: 40.016913, longitude: 116.47491 }, { latitude: 40.016921, longitude: 116.474712 }]}
              />
            ) : getFieldDecorator('latlngs', {
              initialValue: initialValue.latlngs,
            })(
              <Map
                togglePolyline={this.fnTogglePolyline}
                // edit={this.state.edit}
                type={this.props.type}
                latlngs={[{ latitude: 40.016243, longitude: 116.47498 }, { latitude: 40.016913, longitude: 116.47491 }, { latitude: 40.016921, longitude: 116.474712 }]}
              />
            )} */}
            </Form.Item>
          }
        </Form>
      </Modal>
    );
  }
}