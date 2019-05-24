import React, { Component } from 'react';
import { Table, Alert, Dropdown, Button, Icon } from 'antd';
import './Table.css'

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

// 参数：
// columns=>[{name, text}]  字段信息
// data=>[{数据}] 数据源
// onDelete=>function (id)
// onModify=>function (id)
export default class CscTable extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      // columns: [
      //   {
      //     title: '名字',
      //     dataIndex: 'name',
      //   },
      //   {
      //     title: '区划代码',
      //     dataIndex: '2',
      //   },
      //   {
      //     title: '邮编',
      //     dataIndex: '3',
      //   },
      //   {
      //     title: '邮编',
      //     dataIndex: '4',
      //   },
      //   {
      //     title: '邮编',
      //     dataIndex: '5',
      //   },
      //   {
      //     title: '操作',
      //     dataIndex: '6',
      //     render: (text, record) => <a href="javascript:;">编辑</a>,
      //   },
      // ],
      // data: [
      //   {
      //     key: '1',
      //     name: 'John Brown',
      //     age: 32,
      //     address: 'New York No. 1 Lake Park',
      //   },
      //   {
      //     key: '2',
      //     name: 'Jim Green',
      //     age: 42,
      //     address: 'London No. 1 Lake Park',
      //   },
      //   {
      //     key: '3',
      //     name: 'Joe Black',
      //     age: 32,
      //     address: 'Sidney No. 1 Lake Park',
      //   },
      //   {
      //     key: '4',
      //     name: 'Disabled User',
      //     age: 99,
      //     address: 'Sidney No. 1 Lake Park',
      //   },
      // ]
    }
  }

  // fnDelete(id) {
  //   this.props.onDelete && this.props.onDelete(id);
  // }
  // fnModify(id) {
  //   this.props.onModify && this.props.onModify(id);
  // }

  render() {
    return (
      <div id="com_table">
        <div className="antd-pro-components-standard-table-index-standardTable">
          {/* <Alert message="Informational Notes" type="info" showIcon style={{ marginBottom: '16px' }} /> */}
          <Table rowSelection={rowSelection} columns={this.props.columns} dataSource={this.props.data} />
        </div>
      </div>
    );
  }
}