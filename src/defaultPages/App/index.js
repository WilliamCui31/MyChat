import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import PrivateRoute from '../../PrivateRoute';

import Login from '../Login';

import * as actions from '../../store/action';

import { CometChatUI } from '../../cometchat-chat-uikit-react/CometChatWorkspace/src';

import { wrapperStyle } from "./style";

const history = createBrowserHistory();

class App extends React.Component {
    state = {
        isLoggedin: false
    }

    componentDidMount() {
        this.props.getLoggedinUser();
    }

    render() {

        return (
            <div css={wrapperStyle()}>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/chat" component={CometChatUI} />
                        <Route path="/" component={Login} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLoggedinUser: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
