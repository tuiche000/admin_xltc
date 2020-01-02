import React from "react";
import './index.css'

export default class Web extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    active: 0,
  }

  render() {
    return (
      <div className="webTabs">
        <div className="webTabs_left">
          {
            this.props.tabs.map((item, index) => {
              if (index == this.state.active) {
                return (
                  <div className="webTabs_left_item active">{item.title}</div>
                )
              } else {
                return (
                  <div className="webTabs_left_item" onClick={() => {
                    this.setState({
                      active: index
                    })
                  }}>{item.title}</div>
                )
              }
            })
          }
        </div>
        <div className="webTabs_right">
          <div className="webTabs_right_content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}