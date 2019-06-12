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
          return <Input  />
        }
      },
      {
        FieldName: 'name',
        label: '路型等级',
        options: {
        },
        render() {
          return <Input  />
        }
      },
      {
        FieldName: 'name',
        label: '责任路长',
        options: {
        },
        render() {
          return <Input  />
        }
      },
      {
        FieldName: 'name',
        label: '责任部门',
        options: {
        },
        render() {
          return <Input  />
        }
      },
      {
        FieldName: 'name',
        label: '行政区域',
        options: {
        },
        render() {
          return <Input  />
        }
      },
      {
        FieldName: 'name',
        label: '是否有地图',
        options: {
        },
        render() {
          return <Input  />
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
      console.log('Received values of form: ', values);
    });
  };

  fnGridList = async (pageNo, pageSize, keyword) => {
    let data = await window._api.gridList({
      pageNo, pageSize, keyword
    })
    this.setState({
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
      values.region = values.region.value
      if (values.latlngs && values.latlngs.length) {
        values.mapabled = true
      } else {
        values.mapabled = false
      }
      console.log(values)
      if (err) {
        return;
      }
      if (type == 'add') {
        values.departments = values.departments.map(item => {
          return item.value
        })
        this.fnGridAdd(values)
      } else if (type == 'edit') {
        values.id = initialValue.id
        values.departments = values.departments.map(item => {
          return item.value
        })
        this.fnGridEdit(values)
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  fnTableChange = (pageNo, pageSize) => {
    this.fnGridList(pageNo, pageSize)
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

  componentDidMount() {
    this.fnGridList()
  }

  render() {
    const _this = this
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
      },
      {
        title: '责任范围',
        dataIndex: 'range',
      },
      {
        title: '行政区域名称',
        dataIndex: 'regionFullName',
      },
      {
        title: '地图责任网格',
        dataIndex: 'mapabled',
        render: (text, cord) => <span href="javascript:;">{cord.mapabled ? '是' : '否'}</span>
      },
      {
        title: '行政级别型等级',
        dataIndex: 'roadTypeName',
      },
      // {
      //   title: '责任部门',
      //   dataIndex: 'departments',
      // },
      {
        title: '操作',
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
                title="Are you sure delete this task?"
                onConfirm={() => {
                  _this.fnGridDel(record)
                }}
                onCancel={
                  () => {
                    message.error('Click on No');
                  }
                }
                okText="Yes"
                cancelText="No"
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
                <Search  onSearch={value => {
                  let { pageNo, pageSize } = this.state
                  _this.setState({
                    keyword: value
                  })
                  _this.fnGridList(pageNo, pageSize, value)
                }} enterButton />

              </Col>
              {/* <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  查询
            </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>
                  重置
            </Button>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  展开更多 <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col> */}
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