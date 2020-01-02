import React from "react";
import './index.css';
import bg from './images/bg.png';
import { Collapse } from 'antd';
import WebTabs from '@/components/WebTabs/index'
const { Panel } = Collapse;

export default class FAQ extends React.Component {
  state = {
    active: 0
  }
  async componentWillMount() {
    let data = await window._api.questions_type('BASIC_INFO')
    console.log(data)
  }
  changeActive = (active) => {
    this.setState({
      active
    })
  }
  render() {
    return (
      <div>
        <div>
          <img src={bg} width="100%"></img>
        </div>
        <WebTabs
          tabs={[
            {
              title: '踏查管理'
            },
            {
              title: '问题台账'
            },
            {
              title: '消息管理'
            },
            {
              title: '用户管理'
            },
          ]}
          changeActive={this.changeActive}
          active={this.state.active}
        >
          <div>
            {
              this.state.active == 0 && <div>
                踏查管理
              </div>
            }
            {
              this.state.active == 1 && <div>
                问题台账
              </div>
            }
            {
              this.state.active == 2 && <div>
                消息管理
              </div>
            }
            {
              this.state.active == 3 && <div>
                用户管理
              </div>
            }
          </div>
        </WebTabs>
      </div>
    );
  }
}