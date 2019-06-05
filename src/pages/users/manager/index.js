import React from 'react'
import { Form, Alert, Button, Popconfirm, message } from 'antd';
import { Table } from 'antd';
import ModalForm from './form'

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

@Form.create()
export default class AdvancedSearchForm extends React.Component {
  state = {
    visible: false,
    expand: false,
    initialValue: {},
    tableData: [],
    type: 'add',
  };

  fnUserList = async () => {
    let data = await window._api.userList()
    console.log(data)
    this.setState({
      tableData: data.result
    })
  }

  fnUserAdd = async (opt) => {
    let { code } = await window._api.userAdd(opt)
    if (code == 0) {
      message.success('添加成功')
      this.fnUserList()
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
    }
  }

  handleCreate = () => {
    const { type } = this.state
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (type == 'add') {
        this.fnUserAdd(values)
      } else if (type == 'edit') {
        // values.id = initialValue.id
        this.fnUserPut(values)
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

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
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '踏查职级',
        dataIndex: 'roadManagerRank',
      },
      {
        title: '责任部门',
        dataIndex: 'department',
      },
      {
        title: '启用',
        dataIndex: 'enable',
      },
      {
        title: '角色',
        dataIndex: 'roles',
      },
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
                title="Are you sure delete this task?"
                onConfirm={() => {
                  _this.fnUserDel(record)
                }}
                onCancel={
                  () => {
                    message.error('Click on No');
                  }
                }
                okText="Yes"
                cancelText="No"
              >
                <a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
              </Popconfirm>
              {/* <a href="javascript:;" style={{ marginLeft: 10 }}>重置密码</a> */}
            </div>
          )
        }
      },
    ];
    return (
      <main id="Grid_Container">
        <section className="antd-pro-pages-list-table-list-tableListOperator">
          <Button icon="plus" type="primary" onClick={e => {
            this.setState({ visible: true, type: 'add' });
          }}>
            新建
          </Button>
          <Button icon="reload" type="primary" onClick={e => {
            this.fnUserList()
          }}>
            刷新
          </Button>
        </section>
        <section className="antd-pro-components-standard-table-index-standardTable">
          <Alert message="Informational Notes" type="info" showIcon style={{ marginBottom: '16px' }} />
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData} />
        </section>

        <ModalForm
          wrappedComponentRef={formRef => {
            this.formRef = formRef;
          }}
          initialValue={this.state.initialValue}
          visible={this.state.visible}
          onCancel={e => {
            this.setState({
              visible: false,
            });
          }}
          onCreate={this.handleCreate}
        />
      </main>
    );
  }
}