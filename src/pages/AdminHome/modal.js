import React from 'react'
import { Descriptions, Modal, Card } from 'antd';
import { Map, Polyline } from 'react-amap';

export default class IssuseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      center: { longitude: 119.5658900000, latitude: 39.9092000000 },
    }
  }

  fnDetail = async (id) => {
    let data = await window._api.gridId(id)
    this.setState({
      data,
      center: data.latlngs[0]
    })
  }

  componentDidMount() {
    
    if (this.props.id) {
      this.fnDetail(this.props.id)
    }
  }

  render() {
    let { data, center } = this.state
    let userNames = ''
    let departmentNames = ''
    if (data) {
      userNames = data.userNames.map(item => {
        return item.name
      })
      userNames = userNames.join(',')

      departmentNames = data.departmentNames.map(item => {
        return item.name
      })
      departmentNames = departmentNames.join(',')
    }
    const plugins = ['ToolBar']
    return (
      <Modal
        // title={type === 'add' ? `添加责任网格` : `编辑责任网格`}
        visible={this.props.visible}
        width="80%"
        footer={null}
        // onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        {data && (<div>

          <section>
            <Descriptions title={`${data.name} 详情`}>
              <Descriptions.Item label="名字">{data.name}</Descriptions.Item>
              <Descriptions.Item label="责任范围">{data.range}</Descriptions.Item>
              <Descriptions.Item label="路型等级">{data.roadTypeName}</Descriptions.Item>
              <Descriptions.Item label="用户">{userNames}</Descriptions.Item>
              <Descriptions.Item label="责任部门">{departmentNames}</Descriptions.Item>
              <Descriptions.Item label="行政区域">{data.regionFullName}</Descriptions.Item>
            </Descriptions>
          </section>
          <section>
            <Card title="地图信息" bordered={false} style={{ width: '100%', height: '600px' }}>
              <div style={{ minWidht: '800px', height: '500px' }}>
                {
                  data.mapabled ? (
                    <Map version={'1.4.14'} zoom={16} center={center} plugins={plugins} >
                      <Polyline path={data.latlngs} />
                    </Map>
                  ) : <div>无地图信息</div>
                }
              </div>
            </Card>
          </section>
        </div>)}

      </Modal>
    )
  }
}