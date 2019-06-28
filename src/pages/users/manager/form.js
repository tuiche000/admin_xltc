import React from 'react'
import { Form, Input, Select, Button, Switch, Upload, Modal, Icon, DatePicker, Row, TreeSelect, message } from 'antd';
import moment from 'moment'

const TreeNode = TreeSelect.TreeNode;

// eslint-disable-next-line
@Form.create()
export default class regiosForm extends React.Component {
  state = {
    ID: "",
    visible: true,
    mapVisble: true,
    avatar: '',
    gData: [],
    roles: [], // 角色opt
    value: undefined, // tree值
    initialValue: {}
  };

  fnToggleMap = () => {
    this.setState((state) => {
      return {
        mapVisble: !state.mapVisble
      }
    })
  }

  normFile = e => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // 选中tree节点
  treeonChange = (value, label, extra) => {

    this.setState({ value });
  };

  fnDetail = async () => {
    let data
    if (this.props.initialValue.username) {
      data = await window._api.userDetail(this.props.initialValue.username)
      this.setState({
        initialValue: data
      })
    }
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

  fnRoleList = async () => {
    let data = await window._api.roleList({
      pageSize: 1000
    })
    this.setState({
      roles: data.result
    })
  }

  // 根据主键获取下一级责任部门列表
  fnGetChildren = async (arr, e) => {

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
          <TreeNode value={item.id} title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.id} title={item.name} isLeaf={item.hasChildren ? false : true} key={item.id} dataRef={item} />;
    })
  };

  componentDidMount() {
    this.fnfirstlevel()
    this.fnRoleList()
    this.fnDetail()
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { initialValue } = this.state
    const { avatar } = this.state
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

    function onChange(date, dateString) {

    }
    const uploadprops = {
      name: 'uploadFile',
      action: `${process.env.API_HOST}/api/oss/user/avator`,
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')).access_token}`
      },
      showUploadList: false,
      listType: "picture",
      // beforeUpload: beforeUpload,
      onChange: (info) => {
        if (info.file.status === 'uploading') {
          sessionStorage;
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
          // Get this url from response in real world.
          this.setState({
            avatar: info.file.response.data.resource
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };

    const uploadButton = (
      <div style={{ width: 60,
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ecf0f1'
      }}>
        <Icon type="upload" />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <Modal
        visible={visible}
        // title="Create a new collection"
        // okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        centered={true}
      >
        {/* {
          !this.state.mapVisble && <div style={{ width: '100%', height: '400px' }}>
            <Map center={position} zoom={5} amapkey={amapkey} events={mapEvents} />
          </div>

        } */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入内容,不得大于20个字符', whitespace: true, max: 20 }],
              initialValue: initialValue.username
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label="名字">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入内容,不得大于6个字符', whitespace: true, max: 6 }],
              initialValue: initialValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ message: '不得大于60个字符', max: 60 }, {
                type: 'email',
              }],
              initialValue: initialValue.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入内容, 不得大于20个字符', max: 20 }],
              initialValue: initialValue.phone
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label="身份证号码">
            {getFieldDecorator('idcard', {
              rules: [{ message: '请输入正确的身份证号码', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ }],
              initialValue: initialValue.idcard
            })(<Input />)}
          </Form.Item>
          <Form.Item label="头像">
            {getFieldDecorator('avatar', {
              rules: [{ required: true, message: '请输入内容' }],
              initialValue: initialValue.avatar,
              getValueFromEvent: this.normFile,
            })(
              <Upload {...uploadprops} >
                {/* {uploadButton} */}
                {(initialValue.avatar || avatar) ? <img width="60" height="60" src={(avatar || initialValue.avatar)} alt="avatar" /> : uploadButton}
              </Upload>
              // <Upload {...uploadprops}>
              //   {initialValue.avatar ? (
              //     <img src={initialValue.avatar} style={{ width: 66, height: 66 }}></img>
              //   ) : (
              //       <Button>
              //         <Icon type="upload" /> Click to upload
              //     </Button>
              //     )}
              // </Upload>
            )}
          </Form.Item>
          <Form.Item label="生日">
            {getFieldDecorator('birthday', {
              // rules: [{ required: true, message: '请输入内容', whitespace: true }],
              initialValue: initialValue.birthday ? moment(initialValue.birthday, 'YYYY-MM-DD') : null
            })(<DatePicker onChange={onChange} />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: '请输入内容', whitespace: true }],
              initialValue: initialValue.gender
            })(<Select >
              <Option value="MALE">男</Option>
              <Option value="FEMALE">女</Option>
            </Select>)}
          </Form.Item>
          {/* <Form.Item label="踏查职级">
            {getFieldDecorator('roadManagerRank', {
              rules: [{ required: true, message: '请输入内容', whitespace: true }],
              initialValue: initialValue.roadManagerRank
            })(<Select >
              <Option value="FIRST">一级踏查人</Option>
              <Option value="SECOND">二级踏查人</Option>
              <Option value="THIRD">三级踏查人</Option>
              <Option value="FOURTH">问题处置员</Option>
              <Option value="FIFTH">问题协调员</Option>
            </Select>)}
          </Form.Item> */}
          <Form.Item label="责任部门">
            {getFieldDecorator('department', {
              rules: [{ required: true, message: '请输入内容' }],
              initialValue: initialValue.department
            })(
              <TreeSelect
                loadData={this.onLoadData}
                onSelect={this.getRegionChildren}
                showSearch
                style={{ width: 300 }}
                // value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}

                allowClear
                onChange={this.treeonChange}
              >
                {this.renderTreeNodes(this.state.gData)}
              </TreeSelect>
            )}
          </Form.Item>
          <Form.Item label="角色">
            {getFieldDecorator('roles', {
              rules: [{ required: true, message: '请输入内容' }],
              initialValue: initialValue.roles
            })(<Select >
              {
                this.state.roles.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.code}>{item.name}</Select.Option>
                  )
                })
              }
            </Select>)}
          </Form.Item>
          <Form.Item label="启用">
            {getFieldDecorator('enabled', {
              // rules: [{ required: true, message: '请输入内容', whitespace: true }],
              initialValue: initialValue.enabled, valuePropName: 'checked'
            })(<Switch />)}
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}