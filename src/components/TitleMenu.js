import React from "react";
import { connect } from 'react-redux'
import { Link, useLocation } from "@reach/router"
import Button from '@material-ui/core/Button';

import Logged from "./Logged";
import Login from "./Login";

// const TitleMenu = ({ authedUser, pathname, dispatch }) => {
const TitleMenu = ({ authedUser, dispatch }) => {
  console.log("TitleMenu authedUser: ", authedUser);
  // console.log("TitleMenu pathname: ", pathname);
  return (
    <nav className="TitleMenu">
      <Button variant="contained">Home</Button>
      <Link to="/">Home</Link>
      <Link to="/poll/new">New Poll</Link>
      <Link to="/leaderboard">Leader Board</Link>
      {authedUser ? <Logged dispatch={dispatch} userId={authedUser} />
      : <Login dispatch={dispatch} />}
    </nav>
  );
};


const mapStateToProps = state => ({
  // pathname: state.router.location.pathname,
})

export default connect(mapStateToProps)(TitleMenu)
