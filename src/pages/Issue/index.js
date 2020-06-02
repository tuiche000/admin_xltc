import React from 'react'
import { Form, Col, Row, Input, DatePicker, Radio, Cascader, Button, message, Icon, Divider } from 'antd';
import IssueModal from './modal'
import MyTable from '@/components/Table'
import HotTags from '@/components/HotTags'
import moment from 'moment';
import queryString from 'query-string'

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
    keyword: '',
    pageNo: 1,
    pageSize: 10,
    loading: false,
    totalResults: 1,
    tableLoading: false,
    //
    opt: {
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
    try {
      let data = await window._api.issueList(opt, {
        pageNo, pageSize, keyword
      })
      this.setState({
        tableData: data.result,
        totalResults: data.totalResults
      })
    } catch (e) {
    } finally {
      this.setState({
        loading: false,
      })
    }
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
        this.fnIssueList()
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

  fnGridFilter = async () => {
    let data = await window._api.gridFilter()

    this.setState({
      grids: data
    })
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
        pageNo: 1,
        opt: {
          ...s.opt,
          issueStatus: tag
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
    this.fnGridFilter()
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
        width: 300,
        render: text => <div style={{
          width: '300px'
        }} className="ellipsis">{text}</div>
      },
      {
        title: '问题级别',
        dataIndex: 'issueTypeName',
      },
      {
        title: '时间',
        dataIndex: 'createDate',
      },
    ];
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
                  _this.fnIssueList()
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
                  let keyword = this.state.keyword
                  let opt = this.state.opt
                  opt.keyword = {keyword}
                  // console.log(this.state.tags)
                  const query = queryString.stringify(this.state.opt)
                  // window.open(`${process.env.API_HOST}/api/oss/issue/query/export?access_token=FI2qlebxvYggug17SgEHHJFbfEdUO6HZ&${query}`)
                  window.open(`${process.env.API_HOST}/api/oss/issue/query/export?access_token=${JSON.parse(sessionStorage.getItem('token')).access_token}&${query}`)
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
                        }} placeholder="请选择" />
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