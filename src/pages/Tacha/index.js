import React from 'react'
import { Form, Col, Input, message, Alert } from 'antd';
import { Table } from 'antd';
import IssueModal from './modal'
import HotTags from '@/components/HotTags'

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
    tableData: [],
    type: 'add',
    initialValue: {}, // form回显的字段
  };

  fnGridList = async () => {
    let data = await window._api.gridList()
    this.setState({
      tableData: data.result
    })
  }

  fnGridAdd = async (opt) => {
    let { code } = await window._api.gridAdd(opt)
    if (code == 0) {
      message.success('添加成功')
      this.fnGridList()
    }
  }

  fnGridEdit = async (opt) => {
    let { code } = await window._api.gridPut(opt)
    if (code == 0) {
      message.success('修改成功')
      this.fnGridList()
    }
  }

  // submit
  handleCreate = () => {
    const { type, initialValue } = this.state
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return;
      }
      if (type == 'add') {
        this.fnGridAdd(values)
      } else if (type == 'edit') {
        values.id = initialValue.id
        this.fnGridEdit(values)
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  // 删除责任网格
  fnGridDel = async (record) => {
    let { code } = await window._api.gridDel(record.id)
    if (code == 0) {
      message.success('删除成功')
      this.fnGridList()
    }
    // this.formRef.props.form.resetFields()
    // this.getRegionChildren(this.state.selectedKeys[0])
  }

  // HotTags
  fnChange(tag) {
    console.log(tag)
  }

  componentDidMount() {
    this.fnGridList()
  }

  render() {
    const _this = this
    const { visible } = _this.state
    const columns = [
      {
        title: '踏查编码',
        dataIndex: 'name',
        render: text => <a href="javascript:;" onClick={
          () => {
            _this.setState({
              visible: true
            })
          }
        }>{text}</a>,
      },
      {
        title: '责任网络',
        dataIndex: 'roadType',
      },
      {
        title: '起点',
        dataIndex: 'address',
      },
      {
        title: '终点',
        dataIndex: 'region',
      },
      {
        title: '角色',
        dataIndex: 'region',
      },
      {
        title: '姓名',
        dataIndex: 'region',
      },
      {
        title: '踏查时间',
        dataIndex: 'region',
      },
      {
        title: '里程(km)',
        dataIndex: 'region',
      },
      {
        title: '用时(min)',
        dataIndex: 'region',
      },
      {
        title: '步数',
        dataIndex: 'region',
      },
      {
        title: '问题数(个)',
        dataIndex: 'region',
      },
      // {
      //   title: '操作',
      //   render(text, record) {
      //     return (
      //       <div>
      //         {/* <a href="javascript:;" onClick={() => {
      //           _this.setState({
      //             visible: true,
      //             type: 'detail'
      //           })
      //         }}>查看</a> */}
      //         <a href="javascript:;" style={{ marginLeft: 10 }} onClick={() => {
      //           _this.setState({
      //             type: 'edit',
      //             initialValue: record,
      //             visible: true,
      //           })
      //         }}>编辑</a>
      //         <Popconfirm
      //           title="Are you sure delete this task?"
      //           onConfirm={() => {
      //             _this.fnGridDel(record)
      //           }}
      //           onCancel={
      //             () => {
      //               message.error('Click on No');
      //             }
      //           }
      //           okText="Yes"
      //           cancelText="No"
      //         >
      //           <a style={{ marginLeft: 10 }} href="javascript:;">删除</a>
      //         </Popconfirm>
      //       </div>
      //     )
      //   }
      // },
    ];
    return (
      <main id="Grid_Container">
        {/* <section className="antd-pro-pages-list-table-list-tableListForm">
          <Form onSubmit={this.handleSearch}>
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  查询
            </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>
                  重置
            </Button>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  展开更多 <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col>
            </Row>
          </Form>
        </section>
        <section className="antd-pro-pages-list-table-list-tableListOperator">
          <Button icon="plus" type="primary" onClick={e => {
            this.setState({ visible: true, type: 'add' });
          }}>
            新建
          </Button>
        </section> */}
        <section className="antd-pro-components-standard-table-index-standardTable">
          <HotTags
            tagsFromServer={[
              '踏查时间',
              '踏查用时',
              '踏查里程',
              '踏查步数',
              '问题数',
            ]}
            title="排序方式："
            fnChange={this.fnChange}
          ></HotTags>
          <br></br>
          <Alert message="共有234条数据" type="info" showIcon style={{ marginBottom: '16px' }} />
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData} />
        </section>
        <IssueModal
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          visible={visible}
        ></IssueModal>
      </main>
    );
  }
}