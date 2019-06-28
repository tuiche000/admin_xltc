import React from 'react'
import { Form, Row, Col, Input, Tree, Button, Select, InputNumber, Cascader, message, Popconfirm } from 'antd';
import ModalForm from './form'
import MyTable from '@/components/Table'

const { TreeNode } = Tree;

@Form.create()
export default class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    tableData: [],
    selectedKeys: [], // 当前选中的parId
    selected: {}, // 当前选中的treeNode对象
    initialValue: {}, // 编辑的数据
    visible: false, // 弹出框显示隐藏
    treeVisible: false,
    type: 'add', // add=>添加 edit=>编辑
    gData: [], //树形数据
    columns: [
      // {
      //   title: '代码',
      //   dataIndex: 'code',
      // },
      {
        title: '部门类型',
        dataIndex: 'departmentType',
        render(text, cord) {
          const Enum = {
            "CITY": '市级',
            "COUNTY": '区县级',
            "TOWNSHIP": '街乡镇',
            "COMMUNITY": '社区级',
          }
          return <span>{Enum[text]}</span>
        }
      },
      {
        title: '名字',
        dataIndex: 'name',
      },
      // {
      //   title: '行政区域',
      //   dataIndex: 'regionId',
      // },
      // {
      //   title: '启用',
      //   dataIndex: 'enabled',
      //   render: (text) => {
      //     if (text) return (
      //       <div>是</div>
      //     )
      //     if (!text) return (
      //       <div>否</div>
      //     )
      //   }
      // },
      // {
      //   title: '显示顺序',
      //   dataIndex: 'displayOrder',
      // },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a href="javascript:;" onClick={
              () => this.fnEdit(record)
            }>编辑</a>
            <Popconfirm
              title="你确定要删除吗？"
              onConfirm={() => {
                this.fnDepartmentDel(text)
              }}
              onCancel={
                () => {
                  message.error('Click on No');
                }
              }
              okText="确定"
              cancelText="取消"
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
            <Input />
          )
        }
      },
      {
        label: '行政区域',
        name: 'regionId',
        element() {
          return (
            <Cascader options={options} onChange={this.onChange} changeOnSelect />
          )
        }
      },
      {
        label: '名字',
        name: 'name',
        element() {
          return (
            <Input />
          )
        }
      },
      {
        label: '部门类型',
        name: 'departmentType',
        element() {
          return (
            <Select >
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
            <Select >
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
    this.setState({
      treeVisible: false,
    })
    let data = await window._api.departmentFirstlevel()
    this.setState({
      tableData: data,
      gData: data,
      treeVisible: true
    })
  }

  fnDepartmentDel = async (record) => {

    let { code } = await window._api.departmentDel(record.id)
    if (code == 0) {
      message.success('删除成功')
      this.fnfirstlevel()
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

    let { code } = await window._api.departmentAdd(opt, query)
    if (code == 0) {
      message.success('添加成功')
      this.fnfirstlevel()
    }
  }

  fnDepartmentEdit = async (opt, query) => {

    let { code } = await window._api.departmentEdit(opt, query)
    if (code == 0) {
      message.success('修改成功')
      this.fnfirstlevel()
    }
  }

  // 根据主键获取下一级责任部门列表
  fnGetChildren = async (selectedKeys, e) => {
    const selectedKey = selectedKeys[0] ? selectedKeys[0] : this.state.selectedKeys
    const selected = e.selectedNodes[0] ? e.selectedNodes[0].props.dataRef : this.state.selected
    let data = await window._api.departmentId(selectedKey)
    this.setState({
      tableData: data,
      selectedKeys,
      selected
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
            <a href="javascript:void(0)" onClick={() => {
              this.setState({
                selectedKeys: []
              }, () => {
                this.fnfirstlevel()
              })
            }}>责任部门</a>
            {
              this.state.treeVisible && (
                <Tree
                  showLine={true}
                  loadData={this.onLoadData}
                  onSelect={this.fnGetChildren}
                // onExpand={this.onExpand}
                >
                  {this.renderTreeNodes(this.state.gData)}
                </Tree>
              )
            }

          </Col>
          <Col span={18}>
            <section className="antd-pro-pages-list-table-list-tableListOperator">
              <Button icon="plus" type="primary" onClick={e => {
                this.setState({ initialValue: {}, visible: true, type: 'add' });
              }}>
                新建
          </Button>

            </section>
            <section className="antd-pro-components-standard-table-index-standardTable">
              <MyTable
                columns={this.state.columns}
                loading={this.state.loading}
                extra={{
                  pagination: {
                    defaultPageSize: 20
                  }
                }}
                tableData={this.state.tableData}
              ></MyTable>
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