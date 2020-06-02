import React from 'react'
import { Form, Row, Col, Button, Divider } from 'antd';
import Detail from './detail'
import MyTable from '@/components/Table'

@Form.create()
export default class AdvancedSearchForm extends React.Component {
  state = {
    visible: false,
    id: '',
    tableData: [],
    rowSelection: [],
    //
    pageNo: 1,
    pageSize: 10,
    totalResults: 1,
    loading: false,
    //
  };

  fnNoticeList = async () => {
    this.setState({
      loading: true,
    })
    const { pageNo, pageSize } = this.state
    try {
      let data = await window._api.noticeList({
        pageNo, pageSize
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

  fnTableChange = (pageNo, pageSize) => {
    this.setState({
      pageNo, pageSize
    }, () => {
      this.fnNoticeList()
    })
  }

  componentDidMount() {
    this.fnNoticeList()
  }

  render() {
    const _this = this
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        render: (text, record, index) => <span>{index + 1}</span>
      },
      {
        title: '问题类型',
        dataIndex: 'noticeType',
        render: text => {
          const Enum = {
            TRANSFER: '交办问题',
            PROCESS: '处理问题',
            DIFFICULT: '疑难问题',
            FINISHED: '处理结束',
          }
          return <span>{Enum[text]}</span>
        },
      },
      {
        title: '踏查时间',
        dataIndex: 'publish',
      },
      {
        title: '消息内容',
        dataIndex: 'context',
      },
      {
        title: '操作',
        render(text, record) {
          return (
            <div>
              <a href="javascript:;" onClick={
                () => {
                  _this.setState({
                    id: record.id,
                  }, () => {
                    _this.setState({
                      visible: true
                    })
                  })
                }
              }>详情</a>
              {/* <Popconfirm
                title="你确定要删除吗？"
                onConfirm={() => {
                  _this.fnRoleDel(record)
                }}

                okText="确定"
                cancelText="取消"
              >
                <a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
              </Popconfirm> */}
            </div>
          )
        }
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          rowSelection: selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <main id="user_manager">
        <section className="antd-pro-pages-list-table-list-tableListForm">
          <Row type="flex" justify="end">
            <Col>
              <Button type="primary" onClick={
                () => {
                  // window.open(`${process.env.API_HOST}/api/oss/notice/query/export?access_token=sUz4g8tohKk8QWnNlHfYhDiHSCNApSmi&ids=${[..._this.state.rowSelection]}`)
                  window.open(`${process.env.API_HOST}/api/oss/notice/query/export?access_token=${JSON.parse(sessionStorage.getItem('token')).access_token}&ids=${[..._this.state.rowSelection]}`)
                }
              }>导出查询结果</Button>
            </Col>
          </Row>
        </section>
        <Divider />
        <section className="antd-pro-components-standard-table-index-standardTable">
          <MyTable
            total={this.state.totalResults}
            extra={{
              rowSelection: rowSelection
            }}
            columns={columns}
            loading={this.state.loading}
            fnTableChange={(pageNo, pageSize) => {
              this.fnTableChange(pageNo, pageSize)
            }}
            tableData={this.state.tableData}
          ></MyTable>
        </section>
        {this.state.id && <Detail
          visible={this.state.visible}
          id={this.state.id}
          onClose={() => {
            _this.setState({
              visible: false,
            });
          }}
        />}


      </main>
    );
  }
}