/*eslint-disable no-unused-vars*/
import React from 'react';
import App from './App';
/*eslint-enable no-unused-vars*/

import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Route } from 'react-router-dom';

import { render } from 'react-dom';

// 国际化
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

render((
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <Router>
        <Route component={App} />
      </Router>
    </LocaleProvider>
  </Provider>
), document.getElementById('root'));
