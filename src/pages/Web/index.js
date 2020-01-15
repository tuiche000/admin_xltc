import React from "react";
import { Route } from "react-router-dom";
import MyHeader from './components/header'
import MyFooter from './components/footer'
import Home from './home/index'
import FAQ from "./faq/index";
import Support from "./support/index";
import Case from "./case/index";
import Use from "./use/index";
import Login from "./Login/index";

export default class Web extends React.Component {
  render() {
    return (
      <div>
        <MyHeader></MyHeader>
        <div style={{minHeight: '500px'}}>
          <Route path="/web/home" component={Home}></Route>
          <Route path="/web/faq" component={FAQ}></Route>
          <Route path="/web/support" component={Support}></Route>
          <Route path="/web/case" component={Case}></Route>
          <Route path="/web/use" component={Use}></Route>
          <Route path="/web/login" component={Login}></Route>
        </div>
        <MyFooter></MyFooter>
      </div>
    );
  }
}