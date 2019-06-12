import React from 'react'
import { Button, Input } from 'antd'
import { Map, MouseTool, Polyline, PolyEditor } from 'react-amap';

const Search = Input.Search;
let AMap = null;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      lineActive: false,
      Slatlngs: [],
    };
    this.amapEvents = {
      created: (mapInstance) => {
        console.log('高德地图 Map 实例:', mapInstance)
        self.instance = mapInstance
        AMap = window.AMap
        this.pluginSearch(mapInstance)
      }
    };
    this.toolEvents = {
      created: (tool) => {
        // console.log(tool)
        self.tool = tool;
      },
      draw({ obj }) {
        self.drawWhat(obj);
      }
    }
    this.editorEvents = {
      created: (ins) => {
        //console.log(ins) 
      },
      addnode: () => { console.log('polyeditor addnode') },
      adjust: () => { console.log('polyeditor adjust') },
      removenode: () => { console.log('polyeditor removenode') },
      end: (obj) => {
        let paths = obj.target.getPath()
        let latlngs = paths.map(item => {
          return {
            "latitude": item.lat,
            "longitude": item.lng
          }
        })
        self.props.save(latlngs)
      },
    };
    this.mapCenter = { longitude: 119.5658900000, latitude: 39.9092000000 }
  }

  pluginSearch(mapInstance) {
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      var autocomplete = new AMap.Autocomplete({
        input: "keyword"
      })
      var placeSearch = new AMap.PlaceSearch({
        map: mapInstance
      })
      AMap.event.addListener(autocomplete, 'select', function (e) {
        //TODO 针对选中的poi实现自己的功能
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name)
      })
    })
  }

  drawWhat(obj) {
    let text = '';
    // console.log(obj)
    switch (obj.CLASS_NAME) {
      case 'AMap.Polyline':
        let paths = obj.getPath()
        let latlngs = paths.map(item => {
          return {
            "latitude": item.lat,
            "longitude": item.lng
          }
        })
        this.props.save(latlngs)
        // text = `你绘制了折线，有${obj.getPath().length}个端点`;
        break;
      default:
        text = '';
    }
  }

  // 准备绘制折线
  polyline() {
    // console.log(this.tool)
    if (this.tool) {
      this.tool.polyline();
      this.setState({
        what: '准备绘制折线'
      });
    }
  }

  clearPolyline = () => {
    if (this.tool) {
      this.tool.close(true);
    }
    this.setState({
      Slatlngs: []
    })
    this.props.save([])
  }

  componentWillMount() {
    const { type, Platlngs } = this.props
    console.log(Platlngs)
    if (type === 'edit') {
      this.props.save(Platlngs)
      this.setState({
        Slatlngs: Platlngs
      })
      this.mapCenter = { longitude: Platlngs[0].longitude, latitude: Platlngs[0].latitude }
    } else {
      console.log(self.instance)
      this.setState({
        Slatlngs: []
      })
    }
  }

  render() {
    const { type } = this.props
    const { Slatlngs } = this.state
    const latlngs = Slatlngs
    // console.log(latlngs)
    const plugins = ['ToolBar']
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <Search id="keyword" style={{ width: 300 }} placeholder="请输入内容" enterButton />
        </div>
        <div style={{ width: '100%', height: '600px' }}>
          <Map version={'1.4.4'} zoom={17} center={this.mapCenter} plugins={plugins} events={this.amapEvents}>
            <MouseTool events={this.toolEvents} />
            <Polyline path={latlngs}>
              <PolyEditor active={this.state.lineActive} events={this.editorEvents} />
            </Polyline>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
            }}>
              {/* <Search id="keyword" style={{ width: 300 }} placeholder="请输入内容" onSearch={value => console.log(value)} enterButton /> */}
            </div>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {
                (type == 'add' || true) && <Button onClick={() => { this.polyline() }}>新增地图责任网格</Button>
              }
              {
                type == 'edit' && <Button onClick={() => {
                  this.setState({
                    lineActive: !this.state.lineActive
                  })
                }}
                  style={{ marginTop: 10 }}
                >{this.state.lineActive ? `保存地图网络` : '编辑地图网络'}</Button>
              }
              <Button onClick={this.clearPolyline}
                style={{ marginTop: 10 }}
              >删除地图网络</Button>
            </div>
          </Map>
        </div>
      </div >
    )
  }
}