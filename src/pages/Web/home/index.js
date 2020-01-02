import React from "react";
import './index.css'

export default class Home extends React.Component {
  render() {
    return (
      <div className="bigbox">
        <div className="box1">
          <div className="topbox">
            <div className="head-left">
              <div className="title-a">小凌踏查</div>
              <div className="title-b">"平台应政策和实践而产生，是路长责任制的软件化实施， 是网格精细化治理城市的探索与实践。运用PC端管理系统+小程序的微服务实现巡查→反馈→协调→处置→督查5 步法管理流程。</div>
              <div className="title-d">免费使用  |  自由定制  |  轻移动  |  智能统计</div>
              <div className="title-c">
                <div className="btn1">免费体检</div>
                <div className="btn2">合作咨询</div>
              </div>
            </div>
            <div className="head-right">
              <div></div>
            </div>
          </div>
        </div>
        <div className="box2">
          <div className="squaer">
            <div className="sqbox">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="sqbox"></div>
            <div className="sqbox"></div>
            <div className="sqbox"></div>
          </div>
        </div>
      </div>
    );
  }
}