import React from 'react'
import { Descriptions, Modal, Card, Timeline, Rate, Tag, Icon } from 'antd';

export default class IssuseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined
    }
  }

  fnfeedbackId = async (id) => {
    let data = await window._api.feedbackId(id)
    this.setState({
      data
    })
  }

  componentDidMount() {
    
    if (this.props.id) {
      this.fnfeedbackId(this.props.id)
    }
  }

  render() {
    let { data } = this.state
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
          <Descriptions title={`${data.id} 详情`}>
            <Descriptions.Item label="意见类型"><Tag color="#f50">{data.feedbackTypeName}</Tag></Descriptions.Item>
            <Descriptions.Item label="手机">{data.phone}</Descriptions.Item>
            <Descriptions.Item label="用户"><Tag color="#2db7f5">{data.userName}</Tag></Descriptions.Item>
            <Descriptions.Item span={3} label="消息内容">{data.context}</Descriptions.Item>
            {/* <Descriptions.Item label={<Icon type="environment" />}>
              {data.address}
            </Descriptions.Item>
            <Descriptions.Item label={<Icon type="clock-circle" />}>
              {data.createDate}
            </Descriptions.Item> */}
          </Descriptions>
        </section>
        <section>
          <Card title="文件集" bordered={false} style={{ width: '100%' }}>
            <Timeline>
              {data.files && data.files.map((item, index) => {
                return (
                  <img key={item.id} src={item.resource}></img>
                )
              })}
            </Timeline>
          </Card>
          {/* <Card title="处理完反馈信息" bordered={false} style={{ width: '100%' }}>
            <div>
              {
                data.files && data.files.map(item => {
                  return (
                    <img key={item.id} src={item.resource}></img>
                  )
                })
              }
            </div>
          </Card> */}
        </section>
      </div>)}
        
      </Modal>
    )
  }
}