import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import TitleBar from "./TitleBar";
import TitleMenu from "./TitleMenu";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Questions from "./Questions";
import QuestionResult from "./QuestionResult";
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

  // const classes = useStyles();

  render() {
    const { authedUser } = this.props;

    return (
      <Fragment>
        <TitleBar title="Would You Rather?" />
        <TitleMenu />
        <Divider className="TitleDivider" />
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid container justify="center" className="AppContainer">
              <Router>
                {!authedUser ? (
                  <Signin default />
                ) : (
                  <Fragment>
                    <Dashboard path="/" />
                    <Signin path="/signin" />
                    <Help path="/help" />
                    <Dashboard path="/dashboard" />
                    <NewQuestion path="/questions/new" />
                    <Questions path="/questions/:questionId" />
                    <QuestionResult path="/questions/result/:questionId" />
                    <Leaderboard path="/leaderboard" />
                    <PageNotFound default />
                  </Fragment>
                )}
              </Router>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
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
