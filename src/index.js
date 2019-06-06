/*eslint-disable no-unused-vars*/
import React from 'react';
import App from './App';
/*eslint-enable no-unused-vars*/

import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Route } from 'react-router-dom';

import { render } from 'react-dom';

render((
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
), document.getElementById('root'));
