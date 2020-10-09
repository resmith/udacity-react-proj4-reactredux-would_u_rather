import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  componentDidMount() {
    if (!this.props.authedUser) {
      navigate("/signin");
    }
  }

  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value;

    this.setState(() => ({
      optionOne,
    }));
  };
  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { authedUser, dispatch } = this.props;

    const question = {
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    };
    dispatch(handleAddQuestion(question));

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
    }));

    navigate(`/`);
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    const optionOneLeft = 280 - optionOne.length;
    const optionTwoLeft = 280 - optionTwo.length;

    return (
      <Paper elevation="3">
        <div className="paperContainer">
          <h3 className="center">New Question</h3>
          <form className="new-tweet" onSubmit={this.handleSubmit}>
            Would you rather
            <br />
            <textarea
              placeholder="option One"
              value={optionOne}
              onChange={this.handleChangeOptionOne}
              className="textarea"
              maxLength={280}
            />
            <br />
            {optionOneLeft <= 100 && (
              <div className="tweet-length">{optionOneLeft}</div>
            )}
            <textarea
              placeholder="option Two"
              value={optionTwo}
              onChange={this.handleChangeOptionTwo}
              className="textarea"
              maxLength={280}
            />
            <br />
            {optionTwoLeft <= 100 && (
              <div className="tweet-length">{optionTwoLeft}</div>
            )}
            <br />
            <Button
              // className="btn"
              variant="contained"
              type="submit"
              disabled={optionOne === "" || optionTwo === ""}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users }, { match }) {
  return {
    authedUser,
    users: Object.values(users),
  };
}

export default connect(mapStateToProps)(NewQuestion);
