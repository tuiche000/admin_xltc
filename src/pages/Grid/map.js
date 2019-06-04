import React from 'react'
import { Map, MouseTool, Polyline, PolyEditor } from 'react-amap';

const layerStyle = {
  padding: '10px',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  position: 'absolute',
  top: '10px',
  left: '10px',
  fontSize: '10px',
};

export default class App extends React.Component {
  constructor() {
    super();
    const self = this;
    this.state = {
      lineActive: true,
      what: '',
    };
    this.toolEvents = {
      created: (tool) => {
        console.log(tool)
        self.tool = tool;
      },
      draw({ obj }) {
        self.drawWhat(obj);
      }
    }
    this.editorEvents = {
      created: (ins) => { console.log(ins) },
      addnode: () => { console.log('polyeditor addnode') },
      adjust: () => { console.log('polyeditor adjust') },
      removenode: () => { console.log('polyeditor removenode') },
      end: () => { console.log('polyeditor end') },
    };
    this.mapCenter = { longitude: 116.47498, latitude: 40.016243 }
  }

  drawWhat(obj) {
    let text = '';
    console.log(obj)
    switch (obj.CLASS_NAME) {
      case 'AMap.Polyline':
        console.log(obj.getPath())
        text = `你绘制了折线，有${obj.getPath().length}个端点`;
        break;
      default:
        text = '';
    }
    this.setState({
      what: text
    });
  }

  // 准备绘制折线
  polyline() {
    console.log(this.tool)
    if (this.tool) {
      this.tool.polyline();
      this.setState({
        what: '准备绘制折线'
      });
    }
  }

  clearPolyline() {

  }

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
    const plugins = ['ToolBar']
    return (
      <div>
        <div style={{ width: '100%', height: '370px' }}>
          <Map zoom={17} center={this.mapCenter} plugins={plugins}>
            {
              this.props.type == 'add' && (
                <MouseTool events={this.toolEvents} />
              )
            }
            {
              this.props.type == 'add' && <div style={layerStyle}>{this.state.what}</div>
            }
            {
              this.props.type == 'detail' && (
                <Polyline path={latlngs}>
                  <PolyEditor active={this.state.lineActive} />
                </Polyline>
              )
            }

          </Map>
        </div>
        {
          this.props.type == 'edit' ? (
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
        {
          this.props.type == 'add' ? (
            <div>
              <button onClick={() => { this.polyline() }}>绘制折线</button>
              <button onClick={() => { this.clearPolyline() }}>清除折线</button>
            </div>
          ) : null
        }
      </div>
    )
  }
}