import React from "react";
import { Route } from "react-router-dom";
import MyHeader from './components/header'
import MyFooter from './components/footer'
import Home from './home'

export default class Web extends React.Component {
  render() {
    return (
      <div>
        <MyHeader></MyHeader>
        <Route path="/web/home" component={Home}></Route>
        <MyFooter></MyFooter>
      </div>
    );
  }
}