import React from 'react'
import { Descriptions, Modal, Card, Timeline, Rate, Tag, Icon } from 'antd';

export default class IssuseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined
    }
  }

  fnIssueId = async (id) => {
    let data = await window._api.issueId(id)
    this.setState({
      data
    })
  }

  componentDidMount() {
    
    if (this.props.id) {
      this.fnIssueId(this.props.id)
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
          <Descriptions title={`${data.name} 详情`}>
            <Descriptions.Item label="问题名称">{data.name}</Descriptions.Item>
            <Descriptions.Item label="状态"><Tag color="#f50">{data.issueStatusName}</Tag></Descriptions.Item>
            <Descriptions.Item label="角色 / 姓名"><Tag color="#2db7f5">{data.levelName} / {data.userName}</Tag></Descriptions.Item>
            <Descriptions.Item span={3} label="问题描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label={<Icon type="environment" />}>
              {data.address}
            </Descriptions.Item>
            <Descriptions.Item label={<Icon type="clock-circle" />}>
              {data.createDate}
            </Descriptions.Item>
          </Descriptions>
        </section>
        <section>
          <Card title="流转信息" bordered={false} style={{ width: '100%' }}>
            <Timeline>
              {data.processes && data.processes.map((item, index) => {
                return (
                  <Timeline.Item key={item.id}>
                    <p>{item.createDate}</p>
                    <p><span>{item.levelName}</span>&nbsp;&nbsp;&nbsp;<span>{item.userName}</span>&nbsp;&nbsp;&nbsp;<span>{item.issueStatusName}</span></p>
                  </Timeline.Item>
                )
              })}
            </Timeline>
          </Card>
          <Card title="处理完反馈信息" bordered={false} style={{ width: '100%' }}>
            <div>
              {
                data.files && data.files.map(item => {
                  return (
                    <img key={item.id} src={item.resource}></img>
                  )
                })
              }
            </div>
          </Card>
          <Card title="评价信息" bordered={false} style={{ width: '100%' }}>
            <Rate disabled defaultValue={data.star} />
            <p>{data.feedback && data.feedback.description}</p>
          </Card>
        </section>
      </div>)}
        
      </Modal>
    )
  }
}