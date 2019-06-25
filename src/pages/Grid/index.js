import React from 'react'
import { Form, Row, Col, Input, Button, Popconfirm, message } from 'antd';
import './index.css'
import MyTable from '@/components/Table'
import GridModal from './modal'

const Search = Input.Search

@Form.create()
export default class AdvancedSearchForm extends React.Component {
  state = {
    visible: false,
    expand: false,
    tableData: [],
    type: 'add',
    initialValue: {}, // form回显的字段
    selectedRows: [], // 选择行
    //
    pageNo: 1,
    pageSize: 10,
    totalResults: 1,
    tableLoading: false,
    keyword: ''
    //
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 3;
    const { getFieldDecorator } = this.props.form;
    const children = []
    const fields = [
      {
        FieldName: 'name',
        label: '名字',
        options: {
        },
        render() {
          return <Input />
        }
      },
      {
        FieldName: 'name',
        label: '路型等级',
        options: {
        },
        render() {
          return <Input />
        }
      },
      {
        FieldName: 'name',
        label: '责任路长',
        options: {
        },
        render() {
          return <Input />
        }
      },
      {
        FieldName: 'name',
        label: '责任部门',
        options: {
        },
        render() {
          return <Input />
        }
      },
      {
        FieldName: 'name',
        label: '行政区域',
        options: {
        },
        render() {
          return <Input />
        }
      },
      {
        FieldName: 'name',
        label: '是否有地图',
        options: {
        },
        render() {
          return <Input />
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

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

    });
  };

  fnGridList = async () => {
    const { pageNo, pageSize, keyword } = this.state
    let data = await window._api.gridList({
      pageNo, pageSize, keyword
    })
    this.setState({
      selectedRows: [],
      tableData: data.result,
      totalResults: data.totalResults,
    })
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  fnGridAdd = async (opt) => {
    let { code } = await window._api.gridAdd(opt)
    if (code == 0) {
      message.success('添加成功')
      this.fnGridList()
      return true
    }
  }

  fnGridEdit = async (opt) => {
    let { code } = await window._api.gridPut(opt)
    if (code == 0) {
      message.success('修改成功')
      this.fnGridList()
      return true
    }
  }

  // submit
  handleCreate = () => {
    const { type, initialValue } = this.state
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {

      if (err) {
        return;
      }

      if (!values.latlngs || !values.latlngs.length) {
        message.warning('请新增地图责任网格')
        return false;
      }

      values.region = values.region.value
      values.mapabled = true
      // if (values.latlngs && values.latlngs.length) {
      //   values.mapabled = true
      // } else {
      //   values.mapabled = false
      // }

      if (type == 'add') {
        values.departments = values.departments.map(item => {
          return item.value
        })
        await this.fnGridAdd(values)
        form.resetFields();
        this.setState({ visible: false });
      } else if (type == 'edit') {
        values.id = initialValue.id
        values.departments = values.departments.map(item => {
          return item.value
        })
        await this.fnGridEdit(values)
        form.resetFields();
        this.setState({ visible: false });
      }

    });
  }

  fnTableChange = (pageNo, pageSize) => {
    this.setState({
      pageNo, pageSize
    }, () => {
      this.fnGridList()
    })
  }

  // 删除责任网格
  fnGridDel = async (arr) => {
    let { code } = await window._api.gridDel(arr)
    if (code == 0) {
      message.success('删除成功')
      this.fnGridList()
    }
    // this.formRef.props.form.resetFields()
    // this.getRegionChildren(this.state.selectedKeys[0])
  }

  componentDidMount() {
    this.fnGridList()
  }

  render() {
    const _this = this
    const { selectedRows } = this.state
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        _this.setState({
          selectedRows: selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const columns = [
      // {
      //   title: '名字',
      //   dataIndex: 'name',
      //   render: text => <a href="javascript:;">{text}</a>,
      // },
      {
        title: '责任网格',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: '责任范围',
        dataIndex: 'range',
        width: 200,
      },
      {
        title: '行政区域名称',
        dataIndex: 'regionFullName',
      },
      {
        title: '地图责任网格',
        dataIndex: 'mapabled',
        render: (text, cord) => <span href="javascript:;">{cord.mapabled ? '是' : '否'}</span>,
        align: "center"
      },
      {
        title: '行政级别型等级',
        dataIndex: 'roadTypeName',
        align: "center"
      },
      // {
      //   title: '责任部门',
      //   dataIndex: 'departments',
      // },
      {
        title: '操作',
        align: "center",
        render(text, record) {
          return (
            <div>
              {/* <a href="javascript:;" onClick={() => {
                _this.setState({
                  visible: true,
                  type: 'detail'
                })
              }}>查看</a> */}
              <a href="javascript:;" style={{ marginLeft: 10 }} onClick={() => {
                _this.setState({
                  type: 'edit',
                  initialValue: record,
                  visible: true,
                })
              }}>编辑</a>
              <Popconfirm
                title="你确定要删除吗？"
                onConfirm={() => {
                  _this.fnGridDel(record.id)
                }}

                okText="确定"
                cancelText="取消"
              >
                <a style={{ marginLeft: 10 }} href="javascript:;">删除</a>
              </Popconfirm>
            </div>
          )
        }
      },
    ];
    return (
      <main id="Grid_Container">
        <section className="antd-pro-pages-list-table-list-tableListForm">
          <Form onSubmit={this.handleSearch}>

            {/* <Row gutter={24}>{this.getFields()}</Row> */}
            <Row>
              <Col span={8}>
                <Search placeholder="责任网格/行政区域" onSearch={value => {
                  let { pageNo, pageSize } = this.state
                  _this.setState({
                    pageNo, pageSize,
                    keyword: value
                  }, () => {
                    _this.fnGridList()
                  })
                }} enterButton />

              </Col>
            </Row>
          </Form>
        </section>
        <br></br>
        <section className="antd-pro-pages-list-table-list-tableListOperator">
          <Button icon="plus" type="primary" onClick={e => {
            this.setState({ initialValue: {}, visible: true, type: 'add' });
          }}>
            新建
          </Button>
          {selectedRows.length > 0 && (
            <Popconfirm
              title="你确定要删除吗？"
              onConfirm={() => {
                _this.fnGridDel(selectedRows)
              }}

              okText="确定"
              cancelText="取消"
            >
              <Button type="danger" icon="delete" style={{ marginLeft: 10 }}>删除</Button>
            </Popconfirm>
          )}
        </section>
        <section className="antd-pro-components-standard-table-index-standardTable">
          <MyTable
            total={this.state.totalResults}
            rowSelection={rowSelection}
            columns={columns}
            loading={this.state.tableLoading}
            fnTableChange={(pageNo, pageSize) => {
              this.fnTableChange(pageNo, pageSize)
            }}
            extra={{
              rowSelection: rowSelection
            }}
            tableData={this.state.tableData}
          ></MyTable>
        </section>
        {
          this.state.visible && <GridModal
            wrappedComponentRef={formRef => {
              this.formRef = formRef;
            }}
            visible={this.state.visible}
            type={this.state.type}
            onOk={this.handleCreate}
            initialValue={this.state.initialValue}
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
          >
          </GridModal>
        }
      </main>
    );
  }
}