import React from "react";
import './index.css';
import bg from './images/bg.png';
import { Collapse } from 'antd';
import WebTabs from '@/components/WebTabs/index'
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
        <WebTabs tabs={[
          {
            title: '常见问题'
          },
          {
            title: '踏查问答'
          }
        ]}>
          <div>
            asdasdas
          </div>
        </WebTabs>
      </div>
    );
  }
}