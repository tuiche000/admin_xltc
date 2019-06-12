import React from 'react'
import { Form, Col, Rate, message } from 'antd';
import IssueModal from './modal'
import MyTable from '@/components/Table'
import HotTags from '@/components/HotTags'

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
    id: undefined, // 点击详情的id
    initialValue: {}, // form回显的字段
    //
    pageNo: 1,
    pageSize: 10,
    totalResults: 1,
    tableLoading: false,
    //
  };

  fnIssueList = async (pageNo, pageSize) => {
    let data = await window._api.issueList({}, {
      pageNo, pageSize
    })
    this.setState({
      tableData: data.result,
      totalResults: data.totalResults
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
      this.fnIssueList()
    }
    // this.formRef.props.form.resetFields()
    // this.getRegionChildren(this.state.selectedKeys[0])
  }

  // HotTags
  fnChange(tag) {
    console.log(tag)
  }

  fnTableChange = (pageNo, pageSize) => {
    this.fnIssueList(pageNo, pageSize)
  }

  componentDidMount() {
    this.fnIssueList()
  }

  render() {
    const _this = this
    const { visible, id } = _this.state
    const columns = [
      {
        title: '问题名称',
        dataIndex: 'name',
        render: (text, cord) => <a href="javascript:;" onClick={
          () => {
            _this.setState({
              id: cord.id,
              visible: true,
            })
          }
        }>{text}</a>,
      },
      {
        title: '状态',
        dataIndex: 'issueStatusName',
      },
      {
        title: '角色',
        dataIndex: 'levelName',
      },
      {
        title: '姓名',
        dataIndex: 'userName',
      },
      {
        title: '问题描述',
        dataIndex: 'description',
        width: 400,
      },
      // {
      //   title: '地址',
      //   dataIndex: 'address',
      // },
      {
        title: '问题级别',
        dataIndex: 'issueTypeName',
      },
      {
        title: '时间',
        dataIndex: 'createDate',
      },
      // {
      //   title: '照片/视频',
      //   dataIndex: 'star',
      //   render: (text, cord) => {
      //     return (
      //       <a href="javascript:;" onClick={
      //         () => {
      //           _this.setState({
      //             id: cord.id,
      //             visible: true,
      //           })
      //         }
      //       }>查看详情</a>
      //     )
      //   }
      // },
      // {
      //   title: '评价',
      //   dataIndex: 'star',
      //   render: (text, cord) => {
      //     if (cord.star) return (
      //       <Rate disabled defaultValue={cord.star} />
      //     )
      //   }
      // },
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
              '全部',
              '待交办',
              '已交办',
              '已处理',
              '已评价',
            ]}
            title="排序方式："
            fnChange={this.fnChange}
          ></HotTags>
          <br></br>
          <MyTable
            total={this.state.totalResults}
            rowSelection={rowSelection}
            columns={columns}
            loading={this.state.tableLoading}
            fnTableChange={(pageNo, pageSize) => {
              this.fnTableChange(pageNo, pageSize)
            }}
            tableData={this.state.tableData}
          ></MyTable>
        </section>
        {
          visible && <IssueModal
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
            id={id}
            visible={visible}
          ></IssueModal>
        }

      </main>
    );
  }
}