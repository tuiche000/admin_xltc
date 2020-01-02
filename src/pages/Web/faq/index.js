import React from "react";
import './index.css';
import bg from './images/bg.png';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default class FAQ extends React.Component {
  async componentWillMount() {
    let data = await window._api.questions_type('BASIC_INFO')
    console.log(data)
  }
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
          <div className="web_box_right">
            <div>
              <div>常见问题</div>
              <div>更新时间</div>
            </div>
            <div>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                  {/* {text} */}
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    );
  }
}