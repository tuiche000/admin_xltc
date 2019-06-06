import React from 'react'
import { Modal } from 'antd';
import Map from '@/components/Map'

export default class IssuseModal extends React.Component {
  render() {
    return (
      <Modal
        title={`踏查轨迹`}
        visible={this.props.visible}
        bodyStyle={{
          padding: 0
        }}
        width="80%"
        footer={null}
        // onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <Map></Map>
      </Modal>
    )
  }
}