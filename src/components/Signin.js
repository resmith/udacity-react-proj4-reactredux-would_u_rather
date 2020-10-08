import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";

import { DEFAULT_AVATAR } from "../utils/constants";
import { setAuthedUser } from "../actions/authedUser";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "" };
    props.dispatch(setAuthedUser(null));
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(`Signin ${name} ${value}`);
    const { dispatch } = this.props;

    this.setState({ userID: value });

    dispatch(setAuthedUser(value));
    navigate("/");
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <h3 className="center">Sign In</h3>
        <FormControl>
          <InputLabel htmlFor="userID">UserId</InputLabel>
          {users && users.length && (
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={this.handleChange}
                value={this.state.userId}
              >

                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
              <Avatar
                src={
                  users &&
                  this.state.userId &&
                  users[this.state.userId].avatarUrl
                    ? users[this.state.userId].avatarUrl
                    : DEFAULT_AVATAR
                }
              />
            </div>
          )}
        </FormControl>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: Object.values(users).sort(function (a, b) {
      return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
    }),
  };
}

export default connect(mapStateToProps)(Signin);
