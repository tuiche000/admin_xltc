import React from 'react'
import { Modal } from 'antd';
import Map from './map'

export default class IssuseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    const { id } = this.props
    this.fnDetail(id)
  }

  fnDetail = async (id) => {
    let data = await window._api.tachaId(id)
    this.setState({
      data: data
    })
  }

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
        {Object.keys(this.state.data).length && <Map
          data={this.state.data}
        ></Map>}

      </Modal>
    )
  }
}