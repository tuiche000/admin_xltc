import React from 'react'
import { Input, Button } from 'antd'
import { Map, MouseTool, Polyline, PolyEditor } from 'react-amap';

const Search = Input.Search;

const MapSearch = (props) => {
  // props.__map__;
  const map = props.__map__;
  console.log(map)
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const style = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '10px',
  }

  return (
    <div style={style}>
      <Search
        id="tipinput"
        placeholder="input search text"
        onSearch={value => console.log(value)}
        style={{ width: 200 }}
      />
    </div>
  )
};

export default class App extends React.Component {
  constructor() {
    super();
    const self = this;
    this.state = {
      lineActive: true,
      what: '',
    };
    // this.amapEvents = {
    //   created: (mapInstance) => {
    //     console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
    //     //输入提示
    //     var autoOptions = {
    //       input: "tipinput"
    //     };
    //     var auto = new AMap.Autocomplete(autoOptions);
    //     var placeSearch = new AMap.PlaceSearch({
    //       map: mapInstance
    //     });  //构造地点查询类
    //     AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    //     function select(e) {
    //       placeSearch.setCity(e.poi.adcode);
    //       placeSearch.search(e.poi.name);  //关键字查询查询
    //     }
    //   }
    // };
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
    this.mapCenter = { longitude: 116.47498, latitude: 40.016243 }
  }

  drawWhat(obj) {
    let text = '';
    console.log(obj)
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
        <div style={{ width: '100%', height: '600px' }}>
          <Map events={this.amapEvents} zoom={17} center={this.mapCenter} plugins={plugins}>
            {/* <MapSearch /> */}
          </Map>
        </div>
      </div>
    )
  }
}