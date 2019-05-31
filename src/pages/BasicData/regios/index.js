import React from 'react'
import { Tree, Popconfirm, Row, Col, Button, message } from 'antd';

import Table from '@/components/Table';
import ModalForm from './form'

const { TreeNode } = Tree;

export default class SearchTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [], //（受控）展开指定的树节点
      selectedKeys: [], //（受控）设置选中的树节点	
      searchValue: '', //搜索的值
      autoExpandParent: true, //是否自动展开
      gData: [], //树形数据
      dataList: [], //数据列表
      TablePropData: [], //table数据
      initialValue: {}, // 编辑的默认数据 
      visible: false, // 弹出框显示
      type: 'add', // 编辑或新增
      columns: [
        {
          title: '名字',
          dataIndex: 'name',
        },
        {
          title: '区划代码',
          dataIndex: 'areacode',
        },
        {
          title: '邮编',
          dataIndex: '3',
        },
        {
          title: '级别',
          dataIndex: 'level',
        },
        {
          title: '显示顺序',
          dataIndex: 'displayOrder',
        },
        {
          title: '操作',
          dataIndex: '6',
          render: (text, record) => {
            return (
              <div>
                <a href="javascript:;" onClick={(e) => this.fnEdit(record)}>编辑</a>
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={(e) => this.fnDel(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
                </Popconfirm>
              </div>
            )
          }
        },
      ]
    };
  }

  fnEdit = (record) => {
    this.setState({
      type: 'edit',
      visible: true,
      initialValue: record
    })
  }

  fnDel = async (record) => {
    let {code} = await window._api.regionDel(record.id)
    if (code == 0) {
      message.success('删除成功')
    }
    this.formRef.props.form.resetFields()
    this.getRegionChildren(this.state.selectedKeys[0])
  }

  fnForm = () => {
    this.setState({ visible: true, type: 'add' });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  init() {
    const dataList = this.state.dataList
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        dataList.push(node);
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    this.setState({
      dataList
    })
    generateList(this.state.gData);
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

  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.dataRef.hasChildren) {
        window._api.regionChildren(treeNode.props.dataRef.id).then(arr => {
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

  getParentKey = (node, tree) => {
    if (node.parentId) {
      if (tree[node.parentId] && tree[node.parentId].parentId) {
        this.getParentKey(tree[node.parentId], tree)
      }
      return node.parentId
    }
  };

  regionFirstlevel = async () => {
    let data = await window._api.regionFirstlevel()
    this.setState({
      gData: data,
      TablePropData: data,
    });
    this.init()
  }

  // 根据主键获取下一级行政区域列表
  getRegionChildren = async (selectedKeys, e) => {
    let data = await window._api.regionChildren(selectedKeys)
    this.setState({
      TablePropData: data,
      selectedKeys: selectedKeys
    })
  }

  getParent = async () => {
    let data = await window._GET(`region/children?parent=0`);
    this.setState({
      TablePropData: data
    })
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  fnRegionAdd = async (opt, query) => {
    let { code } = await window._api.regionAdd(opt, query)
    if (code == 0) {
      message.success('添加成功')
      this.getRegionChildren(this.state.selectedKeys[0])
      this.formRef.props.form.resetFields()
    }
  }

  fnRegionEdit = async (opt) => {
    let { code } = await window._api.regionPut(opt)
    if (code == 0) {
      message.success('修改成功')
      this.getRegionChildren(this.state.selectedKeys[0])
      this.formRef.props.form.resetFields()
    }
  }

  handleCreate = () => {
    const { type, selectedKeys, initialValue } = this.state
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (type == 'add') {
        this.fnRegionAdd(values, {
          parentId: selectedKeys[0]
        })
      } else if (type == 'edit') {
        values.id = initialValue.id
        this.fnRegionEdit(values)
      }
      
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  componentDidMount() {
    this.regionFirstlevel()
  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  render() {
    // const { expandedKeys, autoExpandParent, selectedKeys } = this.state;
    const loop = data =>
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode key={item.id} title={title} >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.id} title={title} />;
      });

    return (
      <main>
        <Row>
          <Col span={6}>
            <Tree
              loadData={this.onLoadData}
              onSelect={this.getRegionChildren}
              onExpand={this.onExpand}
            >
              <TreeNode key='xzqy' title="行政区域" isLeaf={true} >
              </TreeNode>
              {this.renderTreeNodes(this.state.gData)}
            </Tree>
          </Col>
          <Col span={18}>
            <div className="antd-pro-pages-list-table-list-tableListOperator">
              <Button icon="plus" type="primary" onClick={this.fnForm}>
                新建
              </Button>
              {/* {(
                <span>
                  <Button>批量操作</Button>
                  <Dropdown>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )} */}
            </div>
            <Table data={this.state.TablePropData} columns={this.state.columns} pagination={false} />
          </Col>

        </Row>
        <ModalForm
          wrappedComponentRef={this.saveFormRef}
          initialValue={this.state.initialValue}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </main>
    );
  }
}