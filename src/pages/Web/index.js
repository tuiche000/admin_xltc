import React from "react";
import { Route } from "react-router-dom";
import MyHeader from './components/header'
import MyFooter from './components/footer'
import Home from './home/index'
import FAQ from "./faq/index";

export default class Web extends React.Component {
  render() {
    return (
      <div>
        <MyHeader></MyHeader>
        <Route path="/web/home" component={Home}></Route>
        <Route path="/web/faq" component={FAQ}></Route>
        <MyFooter></MyFooter>
      </div>
    );
  }
}