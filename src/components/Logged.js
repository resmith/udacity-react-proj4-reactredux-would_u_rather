import React from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";

const Logged = ({ authedUser, users }) => {
  return (
    <span className="row">
      Hello &nbsp;{users.name} &nbsp;{" "}
      {users.avatarURL ? <Avatar src={users.avatarURL} /> : ""}
      &nbsp;{" "}
      <Button variant="contained" disabled={!authedUser}>
        <Link to="/signin">Logout</Link>
      </Button>
    </span>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: users[authedUser],
  };
}

export default connect(mapStateToProps)(Logged);
