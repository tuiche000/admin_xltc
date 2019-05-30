import React from 'react'
import { Tree, Input, Row, Col, Button } from 'antd';

import Table from '@/components/Table';
import CscForm from './form'

const { TreeNode } = Tree;

export default class SearchTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [], //（受控）展开指定的树节点
      selectedKeys: ['xzqy'], //（受控）设置选中的树节点	
      searchValue: '', //搜索的值
      autoExpandParent: true, //是否自动展开
      gData: [], //树形数据
      dataList: [], //数据列表
      TablePropData: [], //table数据
      visible: false, // 弹出框显示
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
          render: (text, record) => <a href="javascript:;" onClick={(record) => this.fnEdit(record)}>编辑</a>,
        },
      ]
    };
  }

  fnEdit = (id) => {
    console.log(id)
    this.props.history.push({ pathname: '/basicData/region/form', query: { id } })
  }

  fnForm = () => {
    this.setState({ visible: true });
    // this.props.history.push({
    //   pathname: '/basicData/region/form',
    //   query: {
    //     id: this.state.selectedKeys[0]
    //   }
    // })
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

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // onChange = e => {

  //   const _this = this
  //   const value = e.target.value;

  //   const expandedKeys = this.state.dataList
  //     .map(item => {
  //       if (value && item.name.indexOf(value) > -1) {

  //         let parentId = _this.getParentKey(item, this.state.gData);
  //         return parentId
  //       }
  //       return null;
  //     })
  //     .filter((item, i, self) => {
  //       // debugger
  //       return (item == true)
  //       // return false
  //     });
  //   // debugger
  //   this.setState({
  //     expandedKeys,
  //     searchValue: value,
  //     autoExpandParent: true,
  //   });
  // };

  componentDidMount() {
    this.regionFirstlevel()
    // this.getRegionChildren(0)
    // this.getParent(0)
  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  render() {
    // const { searchValue, expandedKeys, autoExpandParent, gData } = this.state;
    const { expandedKeys, autoExpandParent, selectedKeys } = this.state;
    const loop = data =>
      data.map(item => {
        // const index = item.name.indexOf(searchValue);
        // const beforeStr = item.name.substr(0, index);
        // const afterStr = item.name.substr(index + searchValue.length);
        // const title =
        //   index > -1 ? (
        //     <span>
        //       {beforeStr}
        //       <span style={{ color: '#f50' }}>{searchValue}</span>
        //       {afterStr}
        //     </span>
        //   ) : (
        //       <span>{item.name}</span>
        //     );
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
            {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} /> */}
            <Tree
              loadData={this.onLoadData}
              onSelect={this.getRegionChildren}
              onExpand={this.onExpand}
              // expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
            // selectedKeys={this.selectedKeys}
            >
              <TreeNode key='xzqy' title="行政区域" isLeaf={true} >
              </TreeNode>
              {/* {gData && loop(gData)} */}
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
        <CscForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </main>
    );
  }
}