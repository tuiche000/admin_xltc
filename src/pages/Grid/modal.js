import React from 'react'
import { Modal, Row, Form, Input, Col, Select, TreeSelect } from 'antd';
import Map from './map'

const TreeNode = TreeSelect.TreeNode;
const { Option } = Select;

@Form.create({
  onValuesChange(props, changedValues, allValues) {
    // if (changedValues.mapabled) mapVisible = changedValues.mapabled
  }
})
export default class GridModal extends React.Component {
  state = {
    edit: true, // 是否允许编辑地图上的线
    gData: [], // 责任部门tree数据
    regionData: [], // 责任部门tree数据
    departmentsVal: undefined, // 责任部门tree值
    regionValue: undefined, // 责任部门tree值
    // mapVisible: false, // 地图是否显示
    userOpt: [], // 踏查人列表selet选项
    lineLatlngs: [], // 默认的线
    initialValue: undefined, // 编辑数据 
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
    this.setState({ departmentsVal: value });
  };

  // region选中tree节点
  regionTreeonChange = (value, label, extra) => {
    console.log(value);
    this.setState({ regionValue: value });
  };

  // 获取踏查人列表
  fnUserList = async () => {
    let data = await window._api.userList({
      pageSize: 10000,
    })
    this.setState({
      userOpt: data.result
    })
  }

  // 保存地图坐标
  mapSave = (latlngs) => {
    console.log(latlngs)
    this.setState({
      lineLatlngs: latlngs
    })
    this.props.form.setFieldsValue({
      latlngs
    })
  }

  // 编辑的时候获取回显id详情
  fnRegoinId = async (id) => {
    let data = await window._api.regionId(id)
    data.value = data.id
    data.label = data.name
    this.setState({
      regionValue: data
    })
  }

  fnGridId = async (id) => {
    let data = await window._api.gridId(id)
    let departmentNames = data.departmentNames.map(item => {
      item.value = item.id
      item.label = item.name
      return item
    })
    this.setState({
      departmentsVal: departmentNames,
      initialValue: data
    })
  }

  componentDidMount() {
    const { type, initialValue } = this.props
    if (type == 'edit') {
      this.fnGridId(initialValue.id)
    }
    if (initialValue.region) {
      this.fnRegoinId(initialValue.region)
    }
    this.fnfirstlevel()
    this.regionFirstlevel()
    this.fnUserList()
  }

  render() {
    const { form, type } = this.props;
    let { regionValue, departmentsVal, initialValue, } = this.state
    console.log(initialValue)
    if (!initialValue) initialValue = {}
    const { userOpt } = this.state
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        width='90%'
        style={{ top: 0 }}
        title={type === 'add' ? `添加责任网格` : `编辑责任网格`}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        {<Form {...formItemLayout} layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="所属行政区">
                {type === 'detail' ? '昂昂溪区' : getFieldDecorator('region', {
                  rules: [{ required: true, message: 'Please input' }],
                  initialValue: regionValue,
                })(
                  <TreeSelect
                    labelInValue={true}
                    loadData={this.regoinOnLoadData}
                    showSearch
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请输入内容"
                    allowClear
                    onChange={this.regionTreeonChange}
                  >
                    {this.regionRenderTreeNodes(this.state.regionData)}
                  </TreeSelect>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="行政级别型等级">
                {type === 'detail' ? '乡道' : getFieldDecorator('roadType', {
                  rules: [{ required: true, message: 'Please input' }],
                  initialValue: initialValue.roadType,
                })(
                  <Select placeholder="请输入内容">
                    <Option value="STATE">国道</Option>
                    <Option value="PROVINCE">省道</Option>
                    <Option value="COUNTY">县道</Option>
                    <Option value="VILLAGE">乡道</Option>
                    <Option value="SPECIAL">专用公路</Option>
                    <Option value="MOUNTAIN">石景山区</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="请输入责任网格">
                {type === 'detail' ? '第一路和第二路' : getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input' }],
                  initialValue: initialValue.name,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="请输入责任范围">
                {getFieldDecorator('range', {
                  rules: [{ required: true, message: 'Please input' }],
                  initialValue: initialValue.range,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="责任路长">
                {type === 'detail' ? '张二明' : getFieldDecorator('users', {
                  rules: [{ required: true, message: 'Please input' }],
                  initialValue: initialValue.users,
                })(
                  <Select mode="multiple" placeholder="请输入内容">
                    {
                      userOpt.map((item, index) => {
                        return <Option key={item.id}>{item.name}</Option>
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="责任部门">
                {type === 'detail' ? '责任部门' : getFieldDecorator('departments', {
                  rules: [{ required: true, message: 'Please input' }],
                  initialValue: departmentsVal,
                })(
                  <TreeSelect
                    labelInValue={true}
                    loadData={this.onLoadData}
                    // onSelect={this.getRegionChildren}
                    showSearch
                    multiple
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请输入内容"
                    allowClear
                    onChange={this.treeonChange}
                  >
                    {this.renderTreeNodes(this.state.gData)}
                  </TreeSelect>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              {
                (type == 'edit' && Object.keys(initialValue).length) && <Map
                  togglePolyline={this.fnTogglePolyline}
                  // edit={this.state.edit}
                  save={(latlngs) => {
                    this.mapSave(latlngs)
                  }}
                  type={this.props.type}
                  // Platlngs={lineLatlngs}
                  Platlngs={initialValue.latlngs}
                />
              }
              {
                type == 'add' && <Map
                  togglePolyline={this.fnTogglePolyline}
                  // edit={this.state.edit}
                  save={(latlngs) => {
                    this.mapSave(latlngs)
                  }}
                  type={this.props.type}
                // Platlngs={lineLatlngs}
                />
              }
            </Col>
          </Row>
          <Form.Item label="地图" style={{ width: 0, height: 0 }}>
            {
              getFieldDecorator('latlngs')(<div></div>)
            }
          </Form.Item>
          {/* <Form.Item label="是否有地图">
            {type === 'detail' ? '是' : getFieldDecorator('mapabled', {
              // rules: [{ required: true, message: 'Please input' }],
              valuePropName: 'checked',
              initialValue: initialValue.mapabled || true,
            })(<Switch />)}
          </Form.Item> */}
        </Form>}
      </Modal>
    );
  }
}