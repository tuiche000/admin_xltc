import React from 'react'
import { Form, Button, Popconfirm, message, Row, Col, Input, Icon, Upload, Divider } from 'antd';
import ModalForm from './form'
import MyTable from '@/components/Table'
// import moment from 'moment';

import './index.css'

const Search = Input.Search

@Form.create()
export default class AdvancedSearchForm extends React.Component {
  state = {
    visible: false,
    expand: false,
    initialValue: {},
    tableData: [],
    type: 'add',
    selectedRowKeys: [],
    //
    pageNo: 1,
    keyword: '',
    pageSize: 10,
    totalResults: 1,
    tableLoading: false,
    //
  };

  fnUserList = async () => {
    const { pageNo, pageSize, keyword } = this.state
    let data = await window._api.userList({
      pageNo, pageSize, keyword
    })
    this.setState({
      tableData: data.result,
      totalResults: data.totalResults,
    })
  }

  fnUserAdd = async (opt) => {
    let data = await window._api.userAdd(opt)
    if (data) {
      message.success('添加成功')
      this.fnUserList()
      return true
    }
  }

  fnUserDel = async (opt) => {
    let { code } = await window._api.userDel(opt.username)
    if (code == 0) {
      message.success('删除成功')
      this.fnUserList()
    }
  }

  fnUserPut = async (opt) => {
    let { code } = await window._api.userPut(opt, opt.username)
    if (code == 0) {
      message.success('修改成功')
      this.fnUserList()
      return true
    }
  }

  handleCreate = () => {
    const { type } = this.state
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {
      console.log(values)
      if (err) {
        return;
      }
      // if (values.birthday) {
      //   values.birthday = moment(values.birthday).format('YYYY-MM-DD')
      // }
      if (values.avatar) {
        values.avatar = values.avatar[values.avatar.length - 1].response.data.resource
      }
      if (values.roles) values.roles = [values.roles]
      
      if (type == 'add') {
        const data = await this.fnUserAdd(values)
        if (data) {
          form.resetFields();
          this.setState({ visible: false });
        }
      } else if (type == 'edit') {
        // values.id = initialValue.id
        const data = await this.fnUserPut(values)
        if (data) {
          form.resetFields();
          this.setState({ visible: false })
        }
      }
    });
  };

  fnTableChange = (pageNo, pageSize) => {
    this.setState({
      pageNo, pageSize
    }, () => {
      this.fnUserList()
    })
  }

  componentDidMount() {
    this.fnUserList()
  }

  render() {
    const _this = this
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '名字',
        dataIndex: 'name',
      },
      // {
      //   title: '邮箱',
      //   dataIndex: 'email',
      // },
      {
        title: '性别',
        dataIndex: 'gender',
        render: text => <span>
          {text == 'MALE' && '男'}
          {text == 'FEMALE' && '女'}
        </span>
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
      },
      {
        title: '踏查职级',
        dataIndex: 'levelName',
      },
      {
        title: '责任部门',
        dataIndex: 'departmentName',
      },
      // {
      //   title: '启用',
      //   dataIndex: 'enable',
      // },
      // {
      //   title: '角色',
      //   dataIndex: 'roles',
      // },
      {
        title: '操作',
        render(text, record) {
          return (
            <div>
              <a href="javascript:;" onClick={
                () => {
                  _this.setState({
                    initialValue: record, visible: true, type: 'edit'
                  })
                }
              }>编辑</a>
              <Popconfirm
                title="你确定要删除吗？"
                onConfirm={() => {
                  _this.fnUserDel(record)
                }}

                okText="确定"
                cancelText="取消"
              >
                <a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
              </Popconfirm>
              {/* <a href="javascript:;" style={{ marginLeft: 10 }}>重置密码</a> */}
            </div>
          )
        }
      },
    ];
    const uploadprops = {
      name: 'file',
      action: `${process.env.API_HOST}/api/oss/user/import`,
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')).access_token}`
      },
      onChange(info) {
        if (info.file.status === 'uploading') {
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.response.message}`);
        }
      },
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        _this.setState({
          selectedRowKeys: selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <main id="user_manager">
        <section className="antd-pro-pages-list-table-list-tableListOperator">
          <Row type="flex" align="middle">
            <Col span={8}>
              <Search placeholder="姓名/手机号码" onSearch={value => {
                _this.setState({
                  keyword: value,
                  pageNo: 1
                }, () => {
                  _this.fnUserList()
                })
              }} enterButton />
            </Col>
            <Col push={10} span={6}>
              <Row type="flex" justify="end">
                <Col>
                  <Upload {...uploadprops}>
                    <Button type="primary">
                      <Icon type="upload" /> 导入
            </Button>
                  </Upload>
                </Col>
                <Col>
                  <Button style={{ marginLeft: 10 }} type="primary" onClick={
                    () => {
                      window.open(`${process.env.API_HOST}/api/oss/user/@paged/export?ids=${[..._this.state.selectedRowKeys]}`)
                    }
                  }>导出查询结果</Button>
                </Col>
              </Row>

            </Col>
          </Row>
          <Divider />
          <Button icon="plus" type="primary" onClick={e => {
            this.setState({ initialValue: {}, visible: true, type: 'add' });
          }}>
            添加
          </Button>
          {/* <Button icon="reload" type="primary" onClick={e => {
            this.fnUserList()
          }}>
            刷新
          </Button> */}
        </section>
        <br></br>
        <section className="antd-pro-components-standard-table-index-standardTable">
          <MyTable
            total={this.state.totalResults}
            columns={columns}
            extra={{
              rowSelection: rowSelection
            }}
            loading={this.state.tableLoading}
            fnTableChange={(pageNo, pageSize) => {
              this.fnTableChange(pageNo, pageSize)
            }}
            tableData={this.state.tableData}
          ></MyTable>
        </section>
        {
          this.state.visible && <ModalForm
            wrappedComponentRef={formRef => {
              this.formRef = formRef;
            }}
            initialValue={this.state.initialValue}
            visible={this.state.visible}
            onCancel={e => {
              _this.setState({
                visible: false,
              });
            }}
            onCreate={this.handleCreate}
          />
        }

      </main>
    );
  }
}