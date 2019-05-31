import React from 'react'
import { Form, Alert, Button, Popover } from 'antd';
import { Table } from 'antd';
import ModalForm from './form'

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
    dataIndex: 'openid',
  },
  {
    title: '角色',
    dataIndex: 'idcard',
  },
  {
    title: '操作',
    render(text, record) {
      return (
        <div>
          <a href="javascript:;" style={{ marginRight: 10 }}>编辑</a>
          <Popover placement="topLeft" title={false} content={(
            <div>
              <a href="javascript:;">禁用</a>
              <a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
              <a href="javascript:;" style={{ marginLeft: 10 }}>重置密码</a>
              {/* <p>Content</p> */}
            </div>
          )}>
            <a href="javascript:;">更多操作</a>
          </Popover>
        </div>
      )
    }
  },
];

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

class AdvancedSearchForm extends React.Component {
  state = {
    visible: false,
    expand: false,
    initialValue: {},
    tableData: [],
  };

  fnUserList = async () => {
    let data = await window._api.userList()
    console.log(data)
    this.setState({
      tableData: data.result
    })
  }

  componentDidMount() {
    this.fnUserList()
  }

  render() {
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
          {/* {(
            <span>
              <Button>批量操作</Button>
              <Dropdown>
                <Button>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          )} */}
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

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm