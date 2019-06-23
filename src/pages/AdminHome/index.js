import React from 'react'
import { Input } from 'antd'
import Modal from './modal'
import { Map, Polyline } from 'react-amap';

const Search = Input.Search

export default class HomeModal extends React.Component {
  constructor(props) {
    super(props)
    let self = this
    this.state = {
      visible: false,
      data: [],
      center: { longitude: 119.5658900000, latitude: 39.9092000000 }
    }
    this.amapEvents = {
      created: (mapInstance) => {
        self.instance = mapInstance
        AMap = window.AMap
      }
    };
  }

  fnTachaList = async (searchVal) => {
    let data = await window._api.gridList({ "pageSize": 1000, "pageNo": 1, "keyword": searchVal })
    this.setState({
      data: data.result,
      center: data.result[0].latlngs[0]
    })
    this.instance.setZoom(15)
  }

  componentDidMount() {
    this.fnTachaList()
  }

  render() {
    const _this = this
    let { data, center, visible, id, zoom } = this.state
    const plugins = ['ToolBar']
    return (
      <div style={{ height: '100%' }}>
        <Map events={this.amapEvents} version={'1.4.14'} zoom={15} center={center} plugins={plugins} >
          {
            data.length && data.map(item => {
              return (
                <Polyline style={{ cursor: 'pointer', strokeWeight: 10 }} key={item.id} path={item.latlngs} events={
                  {
                    click: () => { _this.setState({ id: item.id, visible: true }) }
                  }
                } />
              )
            })
          }
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}>
            <Search style={{ width: 300 }} placeholder="责任网格/行政区域" onSearch={value => this.fnTachaList(value)} enterButton />
          </div>
        </Map>
        {visible && <Modal
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          id={id}
          visible={visible}
        ></Modal>}
      </div>
    )
  }
}