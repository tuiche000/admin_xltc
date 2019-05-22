import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// 参数：
class Tabs extends Component{
  constructor(...args){
    super(...args);
  }

  fn(index){
    this.props.onChange && this.props.onChange(index);

    if(this.props.tabs[index].path){
      this.props.history.push(this.props.tabs[index].path, {});
    }
  }

  render(){
    if(!this.props.tabs){
      console.error('tabs props is required');
    }
    return (
      <ul className="nav nav-tabs">
        {this.props.tabs?this.props.tabs.map((tab, index)=>(
          <li key={index} className={tab.selected?'active':''}><a href="javascript:;" onClick={this.fn.bind(this, index)}>{tab.text}</a></li>
        )):''}
      </ul>
    );
  }
}

//export default Tabs;
export default withRouter(Tabs);
