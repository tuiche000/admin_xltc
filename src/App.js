/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import Layout from './layout/index';

import { setLogin } from './actions';

import fetchJson from './utils/fetch';
window.fetchJson = fetchJson

class App extends Component {
  constructor(...args) {
    super(...args);
  }

  async checkLogin() {
    if (this.props.location.pathname != '/login') {
      try {
        await fetchJson('admin/checklogin');

        this.props.setLogin(true);
      } catch (e) {
        this.props.history.push('/login', {});
      }
    }
  }

  async componentDidUpdate() {
    // await this.checkLogin();
  }

  async componentDidMount() {
    // await this.checkLogin();
  }

  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

//export default App;
export default connect((state, props) => Object.assign({}, props, state), {
  setLogin
})(App);
