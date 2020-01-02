import React from "react";
import home1 from './images/home1.png'
import './index.css'
export default class Home extends React.Component {
  render() {
    return (
      <div className="Web_home">
        <header>
          <img src={home1} width="100%"></img>
        </header>
      </div>
    );
  }
}