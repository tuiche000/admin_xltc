import React from "react";
import './index.css';
import img1 from '../images/login.jpg';
import { Collapse, Tabs, Form, Icon, Input, Button, Checkbox } from 'antd';
const { Panel } = Collapse;
const { TabPane } = Tabs;
import Login from '../../Login'

@Form.create()
export default class FAQ extends React.Component {
  // async componentWillMount() {
  //   let data = await window._api.questions_type('BASIC_INFO')
  //   console.log(data)
  // }
  callback(key) {
    console.log(key);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="Web_login_header">
          <div>
            <img src={img1} width={800}></img>
          </div>
        </div>
        <div className="Web_login_content">
          <div className="Web_login_box">
            <Tabs defaultActiveKey="1" animated={false} onChange={this.callback}>
              <TabPane tab="密码登录" key="1">
                <Login
                  fnCancel={() => {
                    this.setState({
                      visible: false
                    })
                  }}
                  type={'login'}
                  visible={true}
                ></Login>
              </TabPane>
              <TabPane tab="短信登录" key="2">
                <Login
                  fnCancel={() => {
                    this.setState({
                      visible: false
                    })
                  }}
                  type={'msg'}
                  visible={true}
                ></Login>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}