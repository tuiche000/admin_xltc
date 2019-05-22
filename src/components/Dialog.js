import React, {Component} from 'react';

import './Dialog.css';

// 参数：
// title=>标题
// shadow=>是否显示背景阴影
// close_btn=>是否有关闭
// onClose=>事件




class Dialog extends Component{
  constructor(...args){
    super(...args);
  }

  close(){
    this.props.onClose && this.props.onClose();
  }

  render(){
    return (
      <div>
        {this.props.shadow?(
          <div className="dialog-shadow"></div>
        ):''}
        <div className="panel panel-default dialog-panel">
          <div className="panel-heading">
            <h2 className="panel-title">
              {this.props.title}
              {this.props.close_btn?(
                <a href="javascript:;" className="glyphicon glyphicon-remove pull-right" onClick={this.close.bind(this)}></a>
              ):''}
            </h2>
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
