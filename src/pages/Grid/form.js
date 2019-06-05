import React from 'react'
import { Modal } from 'antd';

export default class regiosForm extends React.Component {
  state = {
    tableData: [],
  };

  fnUserList = async () => {
    let data = await window._api.userList()
    this.setState({
      tableData: data.result
    })
  }

  componentDidMount() {
    this.fnUserList()
  }

  render() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '责任部门',
        dataIndex: 'department',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '踏查职级',
        dataIndex: 'roadManagerRank',
      },
    ];
    return (
      <Modal
        visible={visible}
        // title="Create a new collection"
        // okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Table columns={columns} dataSource={this.state.tableData} />
      </Modal>

    );
  }
}