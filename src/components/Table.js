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
    const { total, fnTableChange, columns, tableData, loading, pageSize, extra } = this.props
    return (
      <div>
        {/* <Alert message={`共有${total}条数据`} type="info" showIcon style={{ marginBottom: '16px' }} /> */}
        <Table
          pagination={
            {
              "showQuickJumper": true,
              total,
              onChange(page, size) {
                fnTableChange(page, size)
              }
            }
          }
          loading={loading}
          rowKey="id"
          {...extra}
          columns={columns}
          dataSource={tableData}
        />
      </div>
    );
  }
}