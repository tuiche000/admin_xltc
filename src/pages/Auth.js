import React, { Component } from 'react';
const queryString = require('query-string');
// import { Row, Col, Button, Input, message as Message, Typography } from 'antd'
// import { _POST } from '@/utils/fetch'
import { connect } from 'react-redux';

import { loginOut } from '../actions';

@connect((state, props) => Object.assign({}, props, state), { loginOut })
export default class Auth extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
        };
    }

    componentDidMount() {
        let access_token = queryString.parse(this.props.location.search).access_token;
        if (access_token) {
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('token', JSON.stringify({ "access_token": access_token }));
            window.location.href = `${location.origin}/#/home`
        } else {
            window.location.href = `http://ticksite.fothing.com/`
        }
    }

    render() {
        return (
            <div>
                跳转中..
      </div>
        );
    }
}