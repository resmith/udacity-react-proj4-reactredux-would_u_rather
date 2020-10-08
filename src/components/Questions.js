import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router"

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import { handleAddVote } from "../actions/questions";
import { handleAddVoteToUser } from "../actions/users";
import PageNotFound from "../components/PageNotFound";

class Questions extends Component {
  state = { vote: "option1" };

  handleSubmit(event) {
    // event.preventDefault();
    const vote = this.state.vote;
    const { authedUser, question, dispatch, users } = this.props;
    dispatch(handleAddVote(question, vote, authedUser));
    dispatch(handleAddVoteToUser(question, vote, authedUser, users));
    navigate("/");
  }

  render() {
    const selectVote = (event) => {
      const vote = event.target.value;
      this.setState({ vote: vote });
    };

    const { question, users } = this.props;
    if (!question) {
      return <PageNotFound />;
    }

    const questionAuthor = users.find((user) => user.id === question.author);
    // Create the votes variables
    // const alreadyVoted =
    //   question.optionOne.votes.includes(authedUser) ||
    //   question.optionTwo.votes.includes(authedUser);

    return (
      <Card>
        <CardContent>
          <p>{questionAuthor.name} asks:</p>
        </CardContent>
        <CardActions>
          <FormControl component="fieldset">
            <FormLabel component="legend">Would you rather...</FormLabel>
            <RadioGroup
              aria-label="question"
              name="question"
              value={this.state.vote}
              onChange={selectVote}
            >
              <FormControlLabel
                value="optionOne"
                control={<Radio />}
                label={question.optionOne.text}
              />
              <FormControlLabel
                value="optionTwo"
                control={<Radio />}
                label={question.optionTwo.text}
              />
            </RadioGroup>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
          </FormControl>
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  return {
    authedUser,
    users: Object.values(users),
    question: questions[questionId],
  };
}

export default connect(mapStateToProps)(Questions);
