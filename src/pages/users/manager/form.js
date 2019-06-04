import React from 'react'
import { Form, Input, Select, Button, Switch, Upload, Modal, Icon, DatePicker, Checkbox, Row, TreeSelect } from 'antd';
import { Map } from 'react-amap';

const TreeNode = TreeSelect.TreeNode;

// eslint-disable-next-line
class regiosForm extends React.Component {
  state = {
    ID: "",
    visible: true,
    mapVisble: true,
    gData: [],
    value: undefined, // tree值
  };

  fnToggleMap = () => {
    this.setState((state) => {
      return {
        mapVisble: !state.mapVisble
      }
    })
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // 选中tree节点
  treeonChange = (value, label, extra) => {
    console.log(value);
    this.setState({ value });
  };

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

  // 获取第一层的tree数据
  fnfirstlevel = async () => {
    let data = await window._api.departmentFirstlevel()
    this.setState({
      tableData: data,
      gData: data
    })
  }

  // 根据主键获取下一级责任部门列表
  fnGetChildren = async (arr, e) => {
    console.log(e)
    let data = await window._api.departmentId(arr[0])
    this.setState({
      tableData: data,
      selectedKeys: arr,
      selected: e.selectedNodes[0].props.dataRef,
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

  componentDidMount() {
    this.fnfirstlevel()
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
    function onChange(date, dateString) {
      console.log(date, dateString);
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
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="名字">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入', whitespace: true }, {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="头像">
            {getFieldDecorator('nick', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name,
              getValueFromEvent: this.normFile,
            })(<Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>)}
          </Form.Item>
          <Form.Item label="生日">
            {getFieldDecorator('1', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<DatePicker onChange={onChange} />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Select placeholder="Please select a regionType">
              <Option value="CITY">男</Option>
              <Option value="COUNTY">女</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="踏查职级">
            {getFieldDecorator('2', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Select placeholder="Please select a regionType">
              <Option value="CITY">一级踏查人</Option>
              <Option value="COUNTY">二级踏查人</Option>
              <Option value="VILLAGE">三级踏查人</Option>
              <Option value="OTHERS">处理人</Option>
              <Option value="CITY">FIVE</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="责任部门">
            {getFieldDecorator('zrbm', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(
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
                {this.renderTreeNodes(this.state.gData)}
              </TreeSelect>
            )}
          </Form.Item>
          <Form.Item label="启用">
            {getFieldDecorator('4', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="角色">
            {getFieldDecorator('jiaose', {
              rules: [{ required: true, message: '请输入', whitespace: true }],
              initialValue: initialValue.name
            })(<Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Checkbox value="系统管理员">系统管理员</Checkbox>
                <Checkbox value="审计员">
                  审计员
                </Checkbox>
              </Row>
            </Checkbox.Group>)}
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(regiosForm)

export default CollectionCreateForm