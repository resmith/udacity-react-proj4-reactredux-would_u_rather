import React, { useState } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import { handleAddVote } from "../actions/questions";
import { handleAddVoteToUser } from "../actions/users";
import PageNotFound from "../components/PageNotFound";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderColor: "grey",
    borderWidth: "2px",
    margin: "1.25em 1.25em 1.25em 1.25em",
  },
  flexContainer: {
    display: "flex",
  },
  flexCol1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  flexCol2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 8,
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 140,
  },
});

const Questions = (props) => {
  const [vote, setVote] = useState("option1");
  const { authedUser, question, dispatch, authorUser } = props;
  const classes = useStyles();

  const handleSubmit = (event) => {
    // event.preventDefault();
    // const vote = this.state.vote;
    dispatch(handleAddVote(question, vote, authedUser));
    dispatch(handleAddVoteToUser(question, vote, authedUser));
    navigate(`/questions/result/${question.id}`);
  };

  const selectVote = (event) => {
    const currentVote = event.target.value;
    // this.setState({ vote: vote });
    setVote(currentVote);
  };

  if (!question) {
    return <PageNotFound />;
  }

  return (
    <Card>
      <CardContent>
        <p>{authorUser.name} asks:</p>
      </CardContent>
      <Divider />
      <CardActions>
        <div className={classes.flexContainer}>
          <div className={classes.flexCol1}>
            <CardContent>
              {authorUser.avatarURL ? (
                <Avatar src={authorUser.avatarURL} />
              ) : (
                ""
              )}
            </CardContent>
          </div>
          <div className={classes.flexCol2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Would you rather...</FormLabel>
              <RadioGroup
                aria-label="question"
                name="question"
                value={vote}
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
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </FormControl>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  return {
    authedUser,
    question: questions[questionId],
    authorUser: users[questions[questionId].author],
  };
}

export default connect(mapStateToProps)(Questions);
