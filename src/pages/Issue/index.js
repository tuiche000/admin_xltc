import React from 'react'
import { Form, Col, Row, Input, DatePicker, Radio, Cascader, Button, message, Icon, Divider } from 'antd';
import IssueModal from './modal'
import MyTable from '@/components/Table'
import HotTags from '@/components/HotTags'

const Search = Input.Search
const { RangePicker } = DatePicker;

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
    tableData: [],
    type: 'add',
    filterVisible: false, // 筛选条件
    tags: [], // tags选项
    roles: [], // 角色选项
    grids: [], // 责任
    id: undefined, // 点击详情的id
    initialValue: {}, // form回显的字段
    //
    pageNo: 1,
    pageSize: 10,
    loading: false,
    totalResults: 1,
    tableLoading: false,
    //
    opt: {
      routeSort: undefined, // 排序
      roadManagerRank: undefined, // 踏查职级
      issueStatus: undefined, // 问题状态
      gridId: undefined, // 责任网格主键
      regionId: undefined, // 行政区域主键
      fromDate: undefined, // 开始日期
      thruDate: undefined, // 结束日期
    }
  };

  fnIssueList = async () => {
    this.setState({
      loading: true,
    })
    let { pageSize, pageNo, keyword, opt } = this.state
    let data = await window._api.issueList(opt, {
      pageNo, pageSize, keyword
    })
    this.setState({
      loading: false,
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

      if (err) {
        return;
      }
      if (type == 'add') {
        this.fnGridAdd(values)
      } else if (type == 'edit') {
        values.id = initialValue.id
        this.fnGridEdit(values)
      }


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

  fnCommonEnum = async (name) => {
    let data = await window._api.commonEnum(name)
    switch (name) {
      case 'ISSUE_STATUS':
        this.setState({
          tags: data
        })
        return
      case 'ROLE_TYPE':
        this.setState({
          roles: data
        })
        return
    }
  }

  // HotTags
  fnChange = (tag) => {
    this.setState((s, p) => {
      return {
        opt: {
          ...s.opt,
          routeSort: tag
        }
      }
    }, () => {
      this.fnIssueList()
    })
  }

  fnTableChange = (pageNo, pageSize) => {
    this.setState({
      pageNo,
      pageSize
    }, () => {
      this.fnIssueList()
    })
  }

  componentDidMount() {
    this.fnIssueList()
    this.fnCommonEnum('ISSUE_STATUS')
    this.fnCommonEnum('ROLE_TYPE')
  }

  render() {
    const _this = this
    const { visible, id, tags, filterVisible, roles, grids } = _this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      labelAlign: 'left'
    };
    const { getFieldDecorator } = this.props.form;
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
        <section className="antd-pro-pages-list-table-list-tableListForm">
          <Row type="flex" align="middle">
            <Col span={8}>
              <Search placeholder="责任网格/姓名/区域" onSearch={value => {
                _this.setState({
                  keyword: value
                })
                _this.fnTachaList({}, {
                  keyword: value
                })
              }} enterButton />
            </Col>
            <Col push={1} span={2}>
              <a className="ant-dropdown-link" href="javascript:void(0)" onClick={() => {
                this.setState({
                  filterVisible: !filterVisible
                })
              }}>
                筛选条件 <Icon type="down" />
              </a>
            </Col>
            <Col push={11} span={2}>
              <Button type="primary" onClick={
                () => {
                  window.open(`http://checking.fothing.com/api/oss/route/query/export`)
                }
              }>导出查询结果</Button>
            </Col>
          </Row>
          {
            filterVisible && (
              <Row style={{ padding: '0 10', background: '#fff' }}>
                <Col span={24}><Divider /></Col>
                <Col span={24}>
                  <Form {...formItemLayout} onSubmit={this.handleSearch}>
                    <Form.Item label="时间区间">
                      {getFieldDecorator('date')(<RangePicker />)}
                    </Form.Item>
                    <Form.Item label="责任网格">
                      {getFieldDecorator('gridId')(
                        <Cascader fieldNames={{ label: 'name', value: 'key', children: 'children' }} style={{ width: 300 }} options={grids} onChange={(value) => {
                          console.log(value);
                        }} placeholder="Please select" />
                      )}
                    </Form.Item>
                    <Form.Item label="角色">
                      {getFieldDecorator('roadManagerRank')(
                        <Radio.Group buttonStyle="solid">
                          {
                            roles.map(item => {
                              return (
                                <Radio.Button key={item.key} value={item.key}>{item.name}</Radio.Button>
                              )
                            })
                          }
                        </Radio.Group>
                      )}
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 3 },
                      }}
                    >
                      <Button onClick={
                        () => {
                          this.props.form.resetFields();
                        }
                      }>重置</Button>
                      <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>确定</Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            )
          }
        </section>
        <Divider />
        <section className="antd-pro-components-standard-table-index-standardTable">
          <HotTags
            tags={tags}
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
            loading={this.state.loading}
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