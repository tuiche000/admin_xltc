import React from 'react'
import { Map, MouseTool } from 'react-amap';

const layerStyle = {
  padding: '10px',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  position: 'absolute',
  top: '10px',
  left: '10px'
};

// let AMap = null;
export default class MaoTest extends React.Component {
  constructor() {
    super();
    const self = this;
    this.state = {
      what: '点击下方按钮开始绘制'
    };
    this.toolEvents = {
      created: (tool) => {
        self.tool = tool;
      },
      draw({ obj }) {
        self.drawWhat(obj);
      }
    }
    this.amapEvents = {
      created: (mapInstance) => {
        // AMap = window.AMap
        // this.loadUI()
        // this.pluginSearch(mapInstance)
        
      }
    };

    this.mapPlugins = ['ToolBar'];
    this.mapCenter = { longitude: 120, latitude: 35 };
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

  loadUI() {
    
    // 
    // window.AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
    //   this.initPage(SimpleMarker);
    // })
  }

  drawWhat(obj) {
    let text = '';
    
    switch (obj.CLASS_NAME) {
      case 'AMap.Marker':
        text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
        break;
      case 'AMap.Polygon':
        
        text = `你绘制了一个多边形，有${obj.getPath().length}个端点`;
        break;
      case 'AMap.Circle':
        
        
        text = `你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`;
        break;
      case 'AMap.Polyline':
        
        text = `你绘制了折线，有${obj.getPath().length}个端点`;
        break;
      default:
        text = '';
    }
    this.setState({
      what: text
    });
  }

  drawCircle() {
    if (this.tool) {
      this.tool.circle();
      this.setState({
        what: '准备绘制圆形'
      });
    }
  }

  drawRectangle() {
    if (this.tool) {
      this.tool.rectangle();
      this.setState({
        what: '准备绘制多边形（矩形）'
      });
    }
  }

  drawMarker() {
    if (this.tool) {
      this.tool.marker();
      this.setState({
        what: '准备绘制坐标点'
      });
    }
  }

  drawPolygon() {
    if (this.tool) {
      this.tool.polygon();
      this.setState({
        what: '准备绘制多边形'
      });
    }
  }

  polyline() {
    if (this.tool) {
      this.tool.polyline();
      this.setState({
        what: '准备绘制折线'
      });
    }
  }

  close() {
    if (this.tool) {
      this.tool.close();
    }
    this.setState({
      what: '关闭了鼠标工具'
    });
  }

  componentDidMount() {
  }

  render() {
    return <div>
      <div style={{ width: '100%', height: '570px' }}>
        <Map
          plugins={this.mapPlugins}
          version={'1.4.4'}//amap版本
          center={this.mapCenter}
          useAMapUI
          events={this.amapEvents}
        >
          <MouseTool events={this.toolEvents} />
          {/* <div style={layerStyle}><input type="text" id="keyword" name="keyword" /></div> */}
          <div style={layerStyle}>{this.state.what}</div>
        </Map>
      </div>
      <div><input type="text" id="keyword" name="keyword" /></div>
      <button onClick={() => { this.drawMarker() }}>Draw Marker</button>
      <button onClick={() => { this.drawRectangle() }}>Draw Rectangle</button>
      <button onClick={() => { this.drawCircle() }}>Draw Circle</button>
      <button onClick={() => { this.drawPolygon() }}>Draw Polygon</button>
      <button onClick={() => { this.polyline() }}>Draw polyline</button>
      <button onClick={() => { this.close() }}>Close</button>
    </div>
  }
}