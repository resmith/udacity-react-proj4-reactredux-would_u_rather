import React from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import { Button } from "@material-ui/core";

import Logged from "./Logged";
import Login from "./Login";

const TitleMenu = ({ authedUser }) => {
  return (
    <nav className="TitleMenu">
      <Button variant="contained" disabled={!authedUser}>
        <Link to="/">Home</Link>
      </Button>

      <Button variant="contained" disabled={!authedUser}>
        <Link to="/add">New Question</Link>
      </Button>
      <Button variant="contained" disabled={!authedUser}>
        <Link to="/leaderboard">Leader Board</Link>
      </Button>
      {authedUser ? (
        <Logged authedUser={authedUser} />
      ) : (
        <Button variant="contained">
          <Login />
        </Button>
      )}
    </nav>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(TitleMenu);
