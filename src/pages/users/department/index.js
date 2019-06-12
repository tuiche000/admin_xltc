import React from 'react'
import { Form, Row, Col, Input, Tree, Button, Icon, Dropdown, Select, InputNumber, Cascader, Menu, message, Popconfirm, Table } from 'antd';
import ModalForm from './form'

const { TreeNode } = Tree;

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
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    tableData: [],
    selectedKeys: [], // 当前选中的parId
    selected: {}, // 当前选中的treeNode对象
    initialValue: {}, // 编辑的数据
    visible: false, // 弹出框显示隐藏
    type: 'add', // add=>添加 edit=>编辑
    gData: [], //树形数据
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
        render: (text, record) => (
          <div>
            <a href="javascript:;" onClick={
              () => this.fnEdit(record)
            }>编辑</a>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => {
                this.fnDepartmentDel(text)
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
            <Input placeholder="请输入内容" />
          )
        }
      },
      {
        label: '行政区域',
        name: 'regionId',
        element() {
          return (
            <Cascader options={options} onChange={this.onChange} changeOnSelect placeholder="请输入内容" />
          )
        }
      },
      {
        label: '名字',
        name: 'name',
        element() {
          return (
            <Input placeholder="请输入内容" />
          )
        }
      },
      {
        label: '部门类型',
        name: 'departmentType',
        element() {
          return (
            <Select placeholder="请输入内容">
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
            <Select placeholder="请输入内容">
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

  fnEdit = (record) => {
    this.setState({
      type: 'edit',
      visible: true,
      initialValue: record
    })
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
      tableData: data,
      gData: data
    })
  }

  fnDepartmentDel = async (record) => {
    console.log(record)
    let { code } = await window._api.departmentDel(record.id)
    if (code == 0) {
      message.success('删除成功')
    }
    // this.formRef.props.form.resetFields()
    // this.getRegionChildren(this.state.selectedKeys[0])
  }

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} isLeaf={item.hasChildren ? false : true} key={item.id} dataRef={item} />;
    })
  };

  fnDepartmentAdd = async (opt, query) => {
    console.log(this.state.selected)
    let { region } = this.state.selected
    let data = await window._api.departmentAdd(region, opt, query)
    console.log(data)
  }

  fnDepartmentEdit = async (opt, query) => {
    console.log(this.state.initialValue)
    let regionId = this.state.initialValue.region
    let data = await window._api.departmentEdit(regionId, opt, query)
    console.log(data)
  }

  // 根据主键获取下一级责任部门列表
  fnGetChildren = async (arr, e) => {
    console.log(e)
    let data = await window._api.departmentId(arr[0])
    this.setState({
      tableData: data,
      selectedKeys: arr,
      selected: e.selectedNodes[0].props.dataRef,
    })
  }

  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.dataRef.hasChildren) {
        window._api.departmentId(treeNode.props.dataRef.id).then(arr => {
          let newArr = arr.map(item => {
            item.isLeaf = false
            return item
          })
          treeNode.props.dataRef.children = newArr
          this.setState({
            gData: [...this.state.gData],
          });
          console.log(arr)
          resolve();
          return;
        })
      } else {
        resolve();
      }
    });

  handleCreate = () => {
    const { type, selectedKeys, selected, initialValue } = this.state
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let query = selectedKeys[0] ? {
        parentId: selectedKeys[0]
      } : {}
      if (type == 'add') {
        this.fnDepartmentAdd(values, query)
      } else if (type == 'edit') {
        values.id = initialValue.id
        this.fnDepartmentEdit(values, query)
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  componentDidMount() {
    this.fnfirstlevel()
  }

  render() {
    return (
      <main id="Grid_Container">
        <Row>
          <Col span={6}>
            <Tree
              loadData={this.onLoadData}
              onSelect={this.fnGetChildren}
              onExpand={this.onExpand}
            >
              {/* <TreeNode key='xzqy' title="行政区域" isLeaf={true} >
              </TreeNode> */}
              {this.renderTreeNodes(this.state.gData)}
            </Tree>
          </Col>
          <Col span={18}>
            {/* <section className="antd-pro-pages-list-table-list-tableListForm">
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
            </section> */}
            <section className="antd-pro-pages-list-table-list-tableListOperator">
              <Button icon="plus" type="primary" onClick={e => {
                this.setState({ visible: true, type: 'add' });
              }}>
                新建
          </Button>
              {(
                <span>
                  {/* <Button>批量操作</Button> */}
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown> */}
                </span>
              )}
            </section>
            <section className="antd-pro-components-standard-table-index-standardTable">
              <Table pagination={
            {
              defaultPageSize: 20
            }
          } rowKey="id" dataSource={this.state.tableData} columns={this.state.columns} />
            </section>
          </Col>
        </Row>
        <ModalForm
          wrappedComponentRef={formRef => {
            this.formRef = formRef;
          }}
          initialValue={this.state.initialValue}
          visible={this.state.visible}
          onCancel={e => {
            this.setState({
              visible: false,
            });
          }}
          onCreate={this.handleCreate}
        />
      </main>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm