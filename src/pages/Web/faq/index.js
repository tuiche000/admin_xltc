import React from "react";
import './index.css';
import bg from './images/bg.png';
// import { Divider, Row, Col } from 'antd';

export default class FAQ extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img src={bg} width="100%"></img>
        </div>
        <div className="web_box">
          <div className="web_box_left">
            <div className="web_box_left_item active">
              常见问题
            </div>
            <div className="web_box_left_item">
              踏查问答
            </div>
          </div>
        </div>
      </div>
    );
  }
}