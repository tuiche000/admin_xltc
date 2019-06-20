import React from 'react'
import { Button, Input, Row, Col, Statistic, Icon } from 'antd'
import AMap from 'react-amap'
import { Map, MouseTool, Polyline, PolyEditor, InfoWindow } from 'react-amap';

const Search = Input.Search;
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
        // 
        // //输入提示
        // var auto = new AMap.Autocomplete({
        //   input: "tipinput"
        // });
        ;
      }
    };
    this.toolEvents = {
      created: (tool) => {
        
        self.tool = tool;
      },
      draw({ obj }) {
        self.drawWhat(obj);
      }
    }
    this.editorEvents = {
      created: (ins) => {  },
      addnode: () => {  },
      adjust: () => {  },
      removenode: () => {  },
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
    // debugger
    const { data } = props
    if (data.latlngs) {
      this.mapCenter = { longitude: data.latlngs[0].longitude, latitude: data.latlngs[0].latitude }
    }

    // this.mapCenter = { latitude: 39.9519, longitude: 116.49355 }
  }

  drawWhat(obj) {
    let text = '';
    
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

  componentDidMount() {
    const { type, Platlngs } = this.props
    
    if (type === 'edit') {
      this.setState({
        Slatlngs: Platlngs
      })
    } else {
      this.setState({
        Slatlngs: []
      })
    }
  }

  render() {
    const { data } = this.props
    
    // let arr = [
    //   { latitude: 40.017016, longitude: 116.47616 },
    //   { latitude: 40.017114, longitude: 116.479679 },
    //   { latitude: 40.015257, longitude: 116.481439 },
    //   { latitude: 40.015479, longitude: 116.479604 }
    // ]
    // arr = [
    //   {
    //     address: "北京市朝阳区日坛北街33号",
    //     hour: 0,
    //     id: "2FE2JTyJA8pPSKq6Lvd4FS",
    //     latitude: 39.9219,
    //     longitude: 116.44355,
    //     mileage: 0,
    //     min: 0,
    //     route: "16Yyq9MIF8aauiaVTLnjqS",
    //     sec: 29,
    //     step: 0,
    //   },
    //   {
    //     address: "北京市朝阳区日坛北街33号",
    //     hour: 0,
    //     id: "2FE2JTyJA8pPSKq6Lvd4FS",
    //     latitude: 39.9519,
    //     longitude: 116.49355,
    //     mileage: 0,
    //     min: 0,
    //     route: "16Yyq9MIF8aauiaVTLnjqS",
    //     sec: 29,
    //     step: 0,
    //   },
    // ]

    const plugins = ['ToolBar']
    return (
      <div>
        <div style={{ width: '100%', height: '600px' }}>
          <Map version={'1.4.14'} zoom={17} center={this.mapCenter} plugins={plugins} events={this.amapEvents}>
            {/* <MouseTool events={this.toolEvents} /> */}
            <Polyline path={data.latlngs}>
              {/* <PolyEditor active={this.state.lineActive} events={this.editorEvents} /> */}
            </Polyline>
            <InfoWindow
              position={{
                longitude: 116.44355,
                latitude: 39.9219
              }}
              // visible={true}
              content={`<span>起点</span>`}
              isCustom={false}
            />
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '20px',
            }}>
              <Row gutter={16} style={{ width: 500, background: '#fff' }}>
                <Col span={6}>
                  <Statistic title="时:分:秒" value={`${data.hour}:${data.min}:${data.sec}`} />
                </Col>
                <Col span={6}>
                  <Statistic title="里程(KM)" value={data.mileage} precision={2} />
                </Col>
                <Col span={6}>
                  <Statistic title="步数" value={data.step} precision={2} />
                </Col>
                <Col span={6}>
                  <Statistic title="问题" value={data.issue} precision={0} />
                </Col>
              </Row>
            </div>
          </Map>
        </div>
      </div >
    )
  }
}