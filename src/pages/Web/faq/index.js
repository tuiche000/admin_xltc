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
              title: '常见问题'
            },
            {
              title: '踏查问答'
            }
          ]}
          title={{
            "title": '常见问题',
            "time": '更新时间：2019-12-23'
          }}
          changeActive={this.changeActive}
          active={this.state.active}
        >
          <div>
            {
              this.state.active == 0 && <div>
                "答：相信认识是有一个过程的，就像银行刚出来时，很多人宁愿把钱放到床底烂掉，也不愿意存在银行是一样的道理，但最终大家都会把钱存到银行去。企业IT独立安装维护部署的模式是会逐渐被淘汰掉的，这是一个趋势。把企业的IT资产不交给专业的机构去管理，而是通过企业内部的几个人去管理，其实企业的风险更大。"
              </div>
            }
            {
              this.state.active == 1 && <div>
                踏查问题
              </div>
            }
          </div>
        </WebTabs>
      </div>
    );
  }
}