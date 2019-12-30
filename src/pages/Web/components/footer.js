import React from "react";
import './common.css'

export default class Web extends React.Component {
  render() {
    return (
      <footer>
        <div className="foot">
            <div className="foot-t">
              <div>
                <span className="foot-t-t">总部地址</span><br></br>
                北京市朝阳区荣创路
            </div>
            <div className="foot-t-r">
                <span className="foot-t-t">咨询电话</span><br></br>
                (010) 82938033/8030
            </div>
          </div>
          <div className="foot-b">
            <div>Copyright © 2019 北京时代凌宇科技股份有限公司  All rights <span style={{marginLeft: 20}}>京ICP备17044762号-2</span>        <span style={{marginLeft: 40}}>工商网监认证</span>            </div>
          </div>
        </div>
      </footer>
    );
  }
}