import React from 'react'
import { Form, Row, Col, Input, Alert, Button, Icon, Popconfirm, message } from 'antd';
import './index.css'
import { Table } from 'antd';
// import ModalForm from './form'
import GridModal from './modal'

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
    expand: false,
    tableData: [],
    type: 'add',
    initialValue: {}, // form回显的字段
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
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '路型等级',
        options: {
        },
        render() {
          return <Input placeholder="placeholder" />
        }
      },
      {
        FieldName: 'name',
        label: '责任路长',
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

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  fnGridList = async () => {
    let data = await window._api.gridList()
    this.setState({
      tableData: data.result
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

  componentDidMount() {
    this.fnGridList()
  }

  render() {
    const _this = this
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '路型等级',
        dataIndex: 'roadType',
      },
      {
        title: '责任路长',
        dataIndex: 'address',
      },
      {
        title: '行政区域',
        dataIndex: 'region',
      },
      {
        title: '是否有地图',
        dataIndex: 'mapabled',
        render: text => <span href="javascript:;">{text.mapabled ? '是' : '否'}</span>
      },
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
            this.setState({ initialValue: {}, visible: true, type: 'add' });
          }}>
            新建
          </Button>
        </section>
        <section className="antd-pro-components-standard-table-index-standardTable">
          <Alert message="Informational Notes" type="info" showIcon style={{ marginBottom: '16px' }} />
          <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData} />
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