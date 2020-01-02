import React from "react";
import './index.css'

export default class Web extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="webTabs">
        <div className="webTabs_left">
          {
            this.props.tabs.map((item, index) => {
              if (index == this.props.active) {
                return (
                  <div className="webTabs_left_item active">{item.title}</div>
                )
              } else {
                return (
                  <div className="webTabs_left_item" onClick={() => {
                    this.props.changeActive(index)
                  }}>{item.title}</div>
                )
              }
            })
          }
        </div>
        <div className="webTabs_right">
          <div className="webTabs_right_content">
            {
              this.props.title ? (<div style={{textAlign: 'center'}}>
                {
                  <div>
                    <div className="webTabs_right_content_title">{this.props.title.title}</div>
                    <div className="webTabs_right_content_time">{this.props.title.time}</div>
                  </div>
                }
              </div>) : null
            }
            <div style={{marginTop: 50}}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}