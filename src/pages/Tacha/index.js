import React from 'react'
import { Form, Col, Input, Row, Divider, Icon, Button, DatePicker, Radio, Cascader } from 'antd';
import TachaModal from './modal'
import HotTags from '@/components/HotTags'
import MyTable from '@/components/Table'
import moment from 'moment';
import queryString from 'query-string'

const Search = Input.Search
const { RangePicker } = DatePicker;

// rowSelection object indicates the need for row selection
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
    filterVisible: false,
    type: 'add',
    tags: [], // tags选项
    roles: [], // 角色选项
    grids: [], // 责任
    initialValue: {}, // form回显的字段
    id: undefined, // 详情的id
    // table start
    tableData: [],
    totalResults: 1,
    pageSize: 10,
    pageNo: 1,
    keyword: '',
    loading: false,
    // table end
    // list opt
    opt: {
      routeSort: undefined, // 排序
      roadManagerRank: undefined, // 踏查职级
      issueStatus: undefined, // 问题状态
      gridId: undefined, // 责任网格主键
      regionId: undefined, // 行政区域主键
      fromDate: undefined, // 开始日期
      thruDate: undefined, // 结束日期
    }
    // list opt end
  };

  fnTachaList = async (json) => {
    this.setState({
      loading: true,
    })
    let { pageSize, pageNo, keyword, opt } = this.state
    try {
      let data = await window._api.tachaList(opt, { pageSize, pageNo, keyword })
      this.setState({
        tableData: data.result,
        totalResults: data.totalResults,
      })
    } catch (e) {

    } finally {
      this.setState({
        loading: false,
      })
    }

  }

  fnGridFilter = async () => {
    let data = await window._api.gridFilter()

    this.setState({
      grids: data
    })
  }

  fnCommonEnum = async (name) => {
    let data = await window._api.commonEnum(name)
    switch (name) {
      case 'ROUTE_SORT':
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

  // search
  handleSearch = e => {
    e.preventDefault();
    const form = this.props.form

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.setState((s, p) => {
        return {
          pageNo: 1,
          opt: {
            ...s.opt,
            roadManagerRank: values.roadManagerRank,
            gridId: values.gridId ? parseInt(values.gridId[values.gridId.length - 1]) : undefined,
            fromDate: values.date ? moment(values.date[0]).format('YYYY-MM-DD') : undefined,
            thruDate: values.date ? moment(values.date[1]).format('YYYY-MM-DD') : undefined
          }
        }
      }, () => {
        this.fnTachaList()
      })
    })
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
      this.fnTachaList()
    })
  }

  fnTableChange(pageNo, pageSize) {
    this.setState({
      pageNo, pageSize
    }, () => {
      this.fnTachaList()
    })
  }

  componentDidMount() {
    this.fnTachaList()
    this.fnGridFilter()
    this.fnCommonEnum('ROUTE_SORT')
    this.fnCommonEnum('ROLE_TYPE')
  }

  render() {
    const _this = this
    const { visible, filterVisible, tags, roles, grids } = _this.state

    const columns = [
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
      //           title="你确定要删除吗？"
      //           onConfirm={() => {
      //             _this.fnGridDel(record)
      //           }}
      //           onCancel={
      //             () => {
      //               message.error('Click on No');
      //             }
      //           }
      //           okText="确定"
      //           cancelText="取消"
      //         >
      //           <a style={{ marginLeft: 10 }} href="javascript:;">删除</a>
      //         </Popconfirm>
      //       </div>
      //     )
      //   }
      // },
    ];

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
    return (
      <main id="Grid_Container">
        <section className="antd-pro-pages-list-table-list-tableListForm">


          <Row type="flex" align="middle">
            <Col span={8}>
              <Search placeholder="责任网格/姓名/区域" onSearch={value => {
                _this.setState({
                  pageNo: 1,
                  keyword: value
                }, () => {
                  _this.fnTachaList()
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
                  const query = queryString.stringify(this.state.opt)
                  window.open(`${process.env.API_HOST}/api/oss/route/query/export?access_token=${JSON.parse(sessionStorage.getItem('token')).access_token}&${query}`)
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
            loading={this.state.loading}
            fnTableChange={(pageNo, pageSize) => {
              this.fnTableChange(pageNo, pageSize)
            }}
            current= {this.state.pageNo}
            tableData={this.state.tableData}
          ></MyTable>
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