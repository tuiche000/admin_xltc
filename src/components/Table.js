import React from 'react'
import { Table, Button } from 'antd';

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
              "showQuickJumper": {
                goButton: <Button size="small" style={{marginLeft: 10}}>跳转</Button>
              },
              total,
              onChange(page, size) {
                fnTableChange(page, size)
              }
            }
          }
          size="middle"
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