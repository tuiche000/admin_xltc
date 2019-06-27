import React from 'react'
import { Form, Button, Popconfirm, message, Input } from 'antd';
import ModalForm from './form'
import MyTable from '@/components/Table'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {

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
    initialValue: {},
    tableData: [],
    type: 'add',
    //
    pageNo: 1,
    keyword: '',
    pageSize: 10,
    totalResults: 1,
    loading: false,
    //
  };

  fnRoleList = async () => {
    this.setState({
      loading: true,
    })
    const {pageNo, pageSize, keyword} = this.state
    try {
      let data = await window._api.roleList({
        pageNo, pageSize, keyword
      })
      this.setState({
        tableData: data.result,
        totalResults: data.totalResults,
      })
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  fnRoleAdd = async (opt) => {
    let { code } = await window._api.roleAdd(opt)
    if (code == 0) {
      message.success('添加成功')
      this.fnRoleList()
    }
  }

  fnRoleDel = async (opt) => {
    let { code } = await window._api.roleDel(opt.id)
    if (code == 0) {
      message.success('删除成功')
      this.fnRoleList()
    }
  }

  fnRolePut = async (opt) => {
    let { code } = await window._api.rolePut(opt)
    if (code == 0) {
      message.success('修改成功')
      this.fnRoleList()
    }
  }

  handleCreate = () => {
    const { type, initialValue } = this.state
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }

      if (type == 'add') {
        this.fnRoleAdd(values)
      } else if (type == 'edit') {
        values.id = initialValue.id
        this.fnRolePut(values)
      }


      form.resetFields();
      this.setState({ visible: false });
    });
  };

  fnTableChange = (pageNo, pageSize) => {
    this.setState({
      pageNo, pageSize
    }, () => {
      this.fnRoleList()
    })
  }

  componentDidMount() {
    this.fnRoleList()
  }

  render() {
    const _this = this
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'code',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '角色类型',
        dataIndex: 'roadRankName',
        render: (text, record) => {
          return (
            <span>{text}</span>
          )
        }
      },
      {
        title: '描述',
        dataIndex: 'description',
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
                title="你确定要删除吗？"
                onConfirm={() => {
                  _this.fnRoleDel(record)
                }}
                
                okText="确定"
                cancelText="取消"
              >
                <a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
              </Popconfirm>
            </div>
          )
        }
      },
    ];
    return (
      <main id="user_manager">
        <section className="antd-pro-pages-list-table-list-tableListOperator">
          <Button icon="plus" type="primary" onClick={e => {
            this.setState({ initialValue: {}, visible: true, type: 'add' });
          }}>
            添加
          </Button>
          {/* <Button icon="reload" type="primary" onClick={e => {
            this.fnRoleList()
          }}>
            刷新
          </Button> */}
        </section>
        <br></br>
        <section className="antd-pro-components-standard-table-index-standardTable">
          <MyTable
            total={this.state.totalResults}
            rowSelection={rowSelection}
            columns={columns}
            loading={this.state.loading}
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