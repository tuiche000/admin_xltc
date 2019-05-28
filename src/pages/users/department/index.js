import React from 'react'
import { Form, Row, Col, Input, Alert, Button, Icon, Dropdown, Select, InputNumber, Cascader, Menu, message, Popconfirm } from 'antd';
// import './index.css'
import Table from '@/components/Table';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        批量删除
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        批量设置
      </a>
    </Menu.Item>
  </Menu>
);


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
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    tableData: [],
    columns: [
      {
        title: '代码',
        dataIndex: 'code',
      },
      {
        title: '部门类型',
        dataIndex: 'departmentType',
      },
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '行政区域',
        dataIndex: 'regionId',
      },
      {
        title: '启用',
        dataIndex: 'enabled',
        render: (text) => {
          if (text) return (
            <div>是</div>
          )
          if (!text) return (
            <div>否</div>
          )
        }
      },
      {
        title: '显示顺序',
        dataIndex: 'displayOrder',
      },
      {
        title: '操作',
        render: (text) => (
          <div>
            <a href="javascript:;" onClick={
              () => {
                this.props.history.push({
                  pathname: './department/form',
                  query: {
                    id: text.id
                  }
                })
              }
            }>编辑</a>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => {
                message.success('Click on Yes');
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
        ),
      },
    ],
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 3;
    const { getFieldDecorator } = this.props.form;
    const fieldsProps = [
      {
        label: '代码',
        name: 'code',
        element() {
          return (
            <Input placeholder="placeholder" />
          )
        }
      },
      {
        label: '行政区域',
        name: 'regionId',
        element() {
          return (
            <Cascader options={options} onChange={this.onChange} changeOnSelect placeholder="Please select" />
          )
        }
      },
      {
        label: '名字',
        name: 'name',
        element() {
          return (
            <Input placeholder="placeholder" />
          )
        }
      },
      {
        label: '部门类型',
        name: 'departmentType',
        element() {
          return (
            <Select placeholder="Please select a regionType">
              <Option value="CITY">省/市</Option>
              <Option value="COUNTY">区/县</Option>
              <Option value="VILLAGE">街/村</Option>
              <Option value="OTHERS">其他</Option>
            </Select>
          )
        }
      },
      {
        label: '启用',
        name: 'enabled',
        element() {
          return (
            <Select placeholder="Please select a regionType">
              <Option value="CITY">是</Option>
              <Option value="COUNTY">否</Option>
            </Select>
          )
        }
      },
      {
        label: '显示顺序',
        name: 'displayOrder',
        element() {
          return (
            <InputNumber min={1} max={10} initialValue={3} />
          )
        }
      }
    ]
    const children = [];
    for (let i = 0; i < fieldsProps.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={fieldsProps[i].label}>
            {getFieldDecorator(fieldsProps[i].name, fieldsProps[i].rules && {
              rules: fieldsProps[i].rules,
            })(fieldsProps[i].element())}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  onChange = val => {
    console.log(val)
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  fnfirstlevel = async () => {
    let data = await window._api.departmentFirstlevel()
    this.setState({
      tableData: data
    })
  }

  componentDidMount() {
    this.fnfirstlevel()
  }

  render() {
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
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
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
          <Button icon="plus" type="primary" onClick={() => {
            this.props.history.push({
              pathname: './department/form'
            })
          }}>
            新建
          </Button>
          {(
            <span>
              {/* <Button>批量操作</Button> */}
              <Dropdown overlay={menu}>
                <Button>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          )}
        </section>
        <section className="antd-pro-components-standard-table-index-standardTable">
          <Table data={this.state.tableData} columns={this.state.columns} />
        </section>
      </main>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm