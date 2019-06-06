import React from 'react'
import { Descriptions, Modal, Card, Timeline, Rate, Tag, Icon } from 'antd';

export default class IssuseModal extends React.Component {

  fnIssueId = async (id) => {
    let data = await window._api.issueId(id)
    console.log(data)
  }

  componentDidMount() {
    this.fnIssueId()
  }

  render() {
    if (this.props.id) this.fnIssueId(this.props.id)
    return (
      <Modal
        // title={type === 'add' ? `添加责任网络` : `编辑责任网络`}
        visible={this.props.visible}
        width="80%"
        footer={null}
        // onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <section>
          <Descriptions title="荣创路17号_问题000 详情">
            <Descriptions.Item label="问题名称">荣创路17号_问题0001</Descriptions.Item>
            <Descriptions.Item label="状态"><Tag color="#f50">难</Tag></Descriptions.Item>
            <Descriptions.Item label="角色 / 姓名"><Tag color="#2db7f5">一级踏查人 / 张明全</Tag></Descriptions.Item>
            <Descriptions.Item span={3} label="问题描述">北京市朝阳区荣创路有店外经营、垃圾乱堆,北京市朝阳区荣创路有店外经营、垃圾乱堆</Descriptions.Item>
            <Descriptions.Item label={<Icon type="environment" />}>
              北京市朝阳区荣创路17号
             </Descriptions.Item>
            <Descriptions.Item label={<Icon type="clock-circle" />}>
              2019-01-02   12:24
             </Descriptions.Item>
          </Descriptions>
        </section>
        <section>
          <Card title="流转信息" bordered={false} style={{ width: '100%' }}>
            <Timeline>
              <Timeline.Item color="green">
                <p>2019-01-02   12:24</p>
                <p>一级踏查人     张明全   发现问题</p>
              </Timeline.Item>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </Card>
          <Card title="处理完反馈信息" bordered={false} style={{ width: '100%' }}>
            <div>
              问题已处理完，请领导们查看
            </div>
          </Card>
          <Card title="评价信息" bordered={false} style={{ width: '100%' }}>
            <Rate disabled defaultValue={2} />
            <p>评价意见：不错，继续努力</p>
          </Card>
        </section>
      </Modal>
    )
  }
}