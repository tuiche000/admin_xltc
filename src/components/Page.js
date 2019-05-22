import React, {Component} from 'react';

// 参数：
// cur=当前页
// count=总页数
// onChange=function
class Page extends Component{
  constructor(...args){
    super(...args);
  }

  prev(){
    if(this.props.cur-1>=1){
      this.props.onChange && this.props.onChange(this.props.cur-1);
    }
  }

  next(){
    if(this.props.cur+1<=this.props.count){
      this.props.onChange && this.props.onChange(this.props.cur+1);
    }
  }

  fn(index){
    this.props.onChange && this.props.onChange(index);
  }

  render(){
    return (
      <nav>
      <ul className="pagination">
        <li>
          <a onClick={this.prev.bind(this)} href="javascript:;">
            <span>&laquo;</span>
          </a>
        </li>
        {Array.from(new Array(this.props.count)).map((item, index)=>(
          <li key={index} className={this.props.cur==index+1?'active':''}><a onClick={this.fn.bind(this, index+1)} href="javascript:;">{index+1}</a></li>
        ))}
        <li>
          <a onClick={this.next.bind(this)} href="javascript:;">
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    );
  }
}

export default Page;
