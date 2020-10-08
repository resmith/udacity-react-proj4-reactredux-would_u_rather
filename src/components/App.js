import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import { navigate } from "@reach/router";
import Divider from "@material-ui/core/Divider";

import TitleBar from "./TitleBar";
import TitleMenu from "./TitleMenu";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NewPoll from "./NewPoll";
import Questions from "./Questions";
import Leaderboard from "./Leaderboard";
import Signin from "./Signin";
import Help from "./Help";
import PageNotFound from "./PageNotFound";
import { handleInitialData } from "../actions/shared";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Fragment>
        <TitleBar title="Would You Rather?" />
        <TitleMenu />
        <Divider />
        <span className="mainContent">
          <span className="col1" />
          <span className="col10">
            <Router>
              {!authedUser ? (
                <Signin default />
              ) : (
                <Fragment>
                  <Home path="/" />
                  <Signin path="/signin" />
                  <Help path="/help" />
                  <Dashboard path="/dashboard" />
                  <NewPoll path="/poll/new" />
                  <Questions path="/poll" />
                  <Leaderboard path="/leaderboard" />
                  <PageNotFound default />
                </Fragment>
              )}
            </Router>
          </span>
          <span className="col1" />
        </span>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
