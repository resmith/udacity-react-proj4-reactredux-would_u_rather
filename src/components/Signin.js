import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { setAuthedUser } from "../actions/authedUser";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "" };
    props.dispatch(setAuthedUser(null));
  }

  handleChange = (event) => {
    const value = event.target.value;
    const { dispatch } = this.props;

    this.setState({ userID: value });

    dispatch(setAuthedUser(value));
    navigate("/");
  };

  render() {
    const { users } = this.props;
    return (
      <Card>
        <CardContent>
          <h3 className="center">Welcome to the Would You Rather App!</h3>
          <p className="center">Please sign in to continue</p>
          <br />
          <p className="ActionHeading">Sign in</p>
        </CardContent>
        <CardActions>
          <FormControl>
            <InputLabel htmlFor="userID">UserId</InputLabel>
            <br />
            <br />
            {users && users.length && (
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={this.handleChange}
                  value={this.state.userId}
                  className="signinSelect"
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.avatarURL ? <Avatar src={user.avatarURL} /> : ""}
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </FormControl>
        </CardActions>
      </Card>
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
