import React from "react";
import './common.css'

export default class Web extends React.Component {
  render() {
    const { tab } = this.props
    return (
      <div className="web_box">
        <div className="web_box_left">
          <div className="web_box_left_item active">
            常见问题
            </div>
          <div className="web_box_left_item">
            踏查问答
            </div>
        </div>
        <div className="web_box_right">
          
        </div>
      </div>
    );
  }
}