import React from "react";
import './index.css'
import home3 from './images/home3.png';
import people from './images/people.png';
import tacha from './images/tacha.png';
import ccc from './images/ccc.png';
import ddd from './images/ddd.png';
import fff from './images/fff.png';

export default class Home extends React.Component {
  render() {
    return (
      <div className="Web_bigbox">
        <div className="Web_box1">
          <div className="Web_topbox">
            <div className="Web_head-left">
              <div className="Web_title-a"> <img src={tacha} width="100%"></img></div>
              <div className="Web_title-b">"平台应政策和实践而产生，是路长责任制的软件化实施， 是网格精细化治理城市的探索与实践。运用PC端管理系统+小程序的微服务实现巡查→反馈→协调→处置→督查5 步法管理流程。</div>
              <div className="Web_title-d">免费使用  |  自由定制  |  轻移动  |  智能统计</div>
              <div className="Web_title-c">
                <div className="Web_btn1">免费体检</div>
                <div className="Web_btn2">合作咨询</div>
              </div>
            </div>
            <div className="Web_head-right">
              <div></div>
            </div>
          </div>
          <div className="Web_squaer">
            <img src={home3} width="100%"></img>
          </div>
        </div>
        <div className="Web_box2">
          <div className="Web_mid">
            <div className="Web_mid-left">
              <span className="Web_yingyong">应用案列</span>
              <span className="Web_zoubian">走遍秦皇岛</span>
              <span className="Web_words">"河北日报秦皇岛分社社长郭猛、河北日报深度报道部记者王思达专题采访我市"走遍秦皇岛"活动。期间采访了李春副市长和部分二级、三级路长（山海关区委书记赵炳强，山海关区委常委、宣传部长裴海伟，市城管局局长李耀滨，市城管局副局长杨东明；山海关区城管局局长王海、海港区市政处副主任徐春晓、海港区河东街道办事处主任王春光），听取了"走遍秦皇岛"活动的详细介绍和各级路长的...
，并于15日清晨随市城管局负责同志实地体验了"走遍秦皇岛"活动。"</span>
              <span className="Web_know"><a>了解详情>></a></span>
            </div>
            <div className="Web_mid-right">
              <img src={people} width="100%"></img>
            </div>
          </div>
          <div className="Web_mid-bottom">
            <div className="Web_anli">更多案例</div>
          </div>
        </div>
        <div className="Web_box3">
          <img src={ccc} width="100%"></img>
        </div>
        <div className="Web_box4">
          <img src={ddd} width="100%"></img>
        </div>
        <div className="Web_box5">
          <img src={fff} width="100%"></img>
        </div>
      </div>
    );
  }
}