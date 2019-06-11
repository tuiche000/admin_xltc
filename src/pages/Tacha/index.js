import React from 'react'
import { Form, Col, Input, message, Alert, Row, Table, Button, Icon } from 'antd';
import TachaModal from './modal'
import HotTags from '@/components/HotTags'

const Search = Input.Search

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
    // table start
    tableData: [],
    totalResults: 1,
    pageSize: 10,
    pageNo: 1,
    keyword: '',
    loading: false,
    // table end
    type: 'add',
    initialValue: {}, // form回显的字段
    id: undefined, // 详情的id
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 0;
    const { getFieldDecorator } = this.props.form;
    const children = []
    const fields = [
      {
        FieldName: 'name',
        label: '时间区间',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '责任网格',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '角色',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '责任部门',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '行政区域',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '是否有地图',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
    ];
    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={fields[i].label}>
            {getFieldDecorator(`${fields[i].field}`, fields[i].options)(fields[i].render())}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  fnTachaList = async (json) => {
    this.setState({
      loading: true,
    })
    let { pageSize, pageNo, keyword } = this.state
    let searchVal = (json && json.keyword) || keyword
    let Size = (json && json.pageSize) || pageSize
    let Page = (json && json.pageNo) || pageNo
    let data = await window._api.tachaList({}, { "pageSize": Size, "pageNo": Page, "keyword": searchVal })
    this.setState({
      tableData: data.result,
      totalResults: data.totalResults,
      loading: false,
    })
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

  // HotTags
  fnChange(tag) {
    console.log(tag)
  }

  fnTableChange(pageNo, pageSize) {
    this.setState({
      pageNo, pageSize
    })
    this.fnTachaList({
      pageNo, pageSize
    })
  }

  componentDidMount() {
    this.fnTachaList()
  }

  render() {
    const _this = this
    const { visible } = _this.state
    const columns = [
      // {
      //   title: '踏查编码',
      //   dataIndex: 'id',
      //   render: (text, cord) => <a href="javascript:;" onClick={
      //     () => {
      //       _this.setState({
      //         id: cord.id,
      //         visible: true
      //       })
      //     }
      //   }>{text}</a>,
      // },
      {
        title: '责任网格',
        dataIndex: 'gridName',
        render: (text, cord) => <a href="javascript:;" onClick={
          () => {
            _this.setState({
              id: cord.id,
              visible: true
            })
          }
        }>{text}</a>,
      },
      {
        title: '起点',
        dataIndex: 'beginAddress',
      },
      {
        title: '终点',
        dataIndex: 'endAddress',
      },
      // {
      //   title: '角色',
      //   dataIndex: 'rank',
      // },
      {
        title: '姓名',
        dataIndex: 'userName',
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
      },
      {
        title: '里程(km)',
        dataIndex: 'mileage',
      },
      {
        title: '用时(min)',
        dataIndex: 'min',
      },
      {
        title: '步数',
        dataIndex: 'step',
      },
      {
        title: '问题数(个)',
        dataIndex: 'issue',
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
        <section className="antd-pro-pages-list-table-list-tableListForm">
          <Form onSubmit={this.handleSearch}>

            <Row>
              <Col span={8}>
                <Search placeholder="问题名称/角色/人名/区域" onSearch={value => {
                  _this.setState({
                    keyword: value
                  })
                  _this.fnTachaList({
                    keyword: value
                  })
                }} enterButton />

              </Col>
              {/* <Col span={16}>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  筛选条件 <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
                <Button type="primary" htmlType="submit">
                  查询
            </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>
                  重置
            </Button>

                
              </Col> */}
              {/* <Row gutter={24}>{this.getFields()}</Row> */}
            </Row>
          </Form>
        </section>
        <br></br>
        {/* <section className="antd-pro-pages-list-table-list-tableListOperator">
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
          {/* <Table
            fnTableChang={this.fnTableChange} total={this.state.totalResults} rowSelection={rowSelection} columns={columns} tableData={this.state.tableData} /> */}
          <Table pagination={
            {
              "showQuickJumper": true,
              total: this.state.totalResults,
              onChange(pageNo, pageSize) {
                _this.setState({
                  pageNo: pageNo
                })
                _this.fnTachaList({
                  pageNo
                })
              }
            }
          } loading={this.state.loading} rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData} />
        </section>
        {visible && <TachaModal
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          id={this.state.id}
          visible={visible}
        ></TachaModal>}
      </main>
    );
  }
}