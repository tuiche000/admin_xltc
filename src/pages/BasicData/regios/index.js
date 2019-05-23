import React from 'react'
import { Tree, Input, Row, Col, Dropdown, Button, Icon } from 'antd';

import Table from '@/components/Table';
import CscForm from './form'

const { TreeNode } = Tree;
const Search = Input.Search;

export default class SearchTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [], //（受控）展开指定的树节点	
      searchValue: '', //搜索的值
      autoExpandParent: true, //是否自动展开
      gData: [], //树形数据
      dataList: [], //数据列表
      TablePropData: [], //table数据
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
    this.props.history.push('/basicData/region/form')
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

  getParentKey = (node, tree) => {
    // debugger
    // let parentIds = []
    if (node.parentId) {
      // parentIds.push(node.parentId)
      if (tree[node.parentId] && tree[node.parentId].parentId) {
        this.getParentKey(tree[node.parentId], tree)
      }
      return node.parentId
    }
  };

  loadBanner = async () => {
    let data = await window._GET('api/oss/region/all');
    this.setState({
      gData: data.children,
    });
    this.init()
  }

  // 根据主键获取下一级行政区域列表
  getRegionChildren = async (selectedKeys, e) => {
    console.log(selectedKeys, e)
    let data = await window._GET(`api/oss/region/${selectedKeys}`);
    this.setState({
      TablePropData: data
    })
  }

  getParent = async () => {
    let data = await window._GET(`region/children?parent=0`);
    this.setState({
      TablePropData: data
    })
  }

  onExpand = expandedKeys => {
  console.log(expandedKeys)
  this.setState({
    expandedKeys,
    autoExpandParent: false,
  });
};

onChange = e => {

  const _this = this
  const value = e.target.value;

  const expandedKeys = this.state.dataList
    .map(item => {
      if (value && item.name.indexOf(value) > -1) {

        let parentId = _this.getParentKey(item, this.state.gData);
        return parentId
      }
      return null;
    })
    .filter((item, i, self) => {
      // debugger
      return (item == true)
      // return false
    });
  // debugger
  this.setState({
    expandedKeys,
    searchValue: value,
    autoExpandParent: true,
  });
};

componentDidMount() {
  this.loadBanner()
  // this.getParent()
}

componentWillMount() {

}

shouldComponentUpdate(nextProps, nextState) {
  return nextState !== this.state
}

render() {
  const { searchValue, expandedKeys, autoExpandParent, gData } = this.state;
  const loop = data =>
    data.map(item => {
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
            <span>{item.name}</span>
          );
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
      <Row gutter={50}>
        <Col span={6}>
          <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
          <Tree
            onSelect={this.getRegionChildren}
            showLine={true}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {gData && loop(gData)}
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
          <Table data={this.state.TablePropData} columns={this.state.columns} />
        </Col>

      </Row>

    </main>
  );
}
}