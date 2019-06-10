import React from 'react'
import { Table } from 'antd';

export default class MyTable extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  componentDidMount() {
  }

  render() {
    const { total, fnTableChange, rowSelection, columns, tableData } = this.props
    console.log(tableData)
    return (
      <div>
        <Alert message={`共有${total}条数据`} type="info" showIcon style={{ marginBottom: '16px' }} />
        <Table pagination={
          {
            "showQuickJumper": true,
            total,
            onChange(page, pageSize) {
              fnTableChange(page, pageSize)
            }
          }
        } rowSelection={rowSelection} columns={columns} dataSource={tableData} />
      </div>
    );
  }
}