import React from 'react'
import { Map, Polygon, Polyline, PolyEditor } from 'react-amap';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lineActive: true,
      // polygonActive: true,
    };
    this.editorEvents = {
      created: (ins) => { console.log(ins) },
      addnode: () => { console.log('polyeditor addnode') },
      adjust: () => { console.log('polyeditor adjust') },
      removenode: () => { console.log('polyeditor removenode') },
      end: () => { console.log('polyeditor end') },
    };
    // this.linePath = [
    //   { longitude: 150, latitude: 20 },
    //   { longitude: 170, latitude: 20 },
    //   { longitude: 150, latitude: 30 },
    // ];
    this.polygonPath = [
      { longitude: 120, latitude: 30 },
      { longitude: 130, latitude: 30 },
      { longitude: 120, latitude: 40 },
    ];
    this.mapCenter = { longitude: 116.47498, latitude: 40.016243 }
  }
  // togglePolyline() {
  //   this.setState({
  //     lineActive: !this.state.lineActive
  //   });
  // }
  // togglePolygon() {
  //   this.setState({
  //     polygonActive: !this.state.polygonActive
  //   });
  // }

  componentDidMount() {
    console.log(this.props.type)
    if (this.props.type === 'edit') {
      this.setState({
        lineActive: true
      })
    } else {
      this.setState({
        lineActive: false
      })
    }
  }

  render() {
    const { latlngs } = this.props
    // console.log(active)
    const plugins = [
      {
        name: 'ToolBar',
        options: {
          // visible: true,  // 不设置该属性默认就是 true
          onCreated(ins) {
            console.log(ins);
          },
        },
      }
    ]
    return (
      <div>
        <div style={{ width: '100%', height: '370px' }}>
          <Map zoom={17} center={this.mapCenter} plugins={plugins}>
            {/* <Polygon path={latlngs}>
            <PolyEditor active={this.props.active} events={this.editorEvents} />
          </Polygon> */}
            <Polyline path={latlngs}>
              <PolyEditor active={this.state.lineActive} />
            </Polyline>
          </Map>
        </div>
        {
          this.props.edit ? (
            <div>
              <button onClick={() => {
                this.setState({
                  lineActive: !this.state.lineActive
                })
              }} >编辑/取消编辑</button>
              <button onClick={() => { }} >保存坐标</button>
            </div>
          ) : null
        }
      </div>
    )
  }
}