import React from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
// import { yellow } from "@material-ui/core/colors";

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
  flexRow: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 140,
  },
});

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function YourVote(props) {
  const classes = useStyles();
  return (
    <div className="yourVoteContainer">
      <div className="yourVote">
        Your
        <br />
        Vote
      </div>
    </div>
  );
}

function QuestionResult(props) {
  const { authedUser, question, authorUser } = props;
  const classes = useStyles();

  if (!question) {
    return <p>No question ;)</p>;
  }

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const TotalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = (optionOneVotes / TotalVotes) * 100;
  const optionTwoPercentage = (optionTwoVotes / TotalVotes) * 100;
  const optionOnePercentageText = `${optionOneVotes} out of ${TotalVotes} votes`;
  const optionTwoPercentageText = `${optionTwoVotes} out of ${TotalVotes} votes`;

  console.log("QuestionResult optionOne.votes ", question.optionOne.votes);
  console.log("QuestionResult optionTwo.votes ", question.optionTwo.votes);
  console.log("QuestionResult authedUser ", authedUser);

  const votedForOptionOne = question.optionOne.votes.find(
    (elem) => elem === authedUser
  );
  const votedForOptionTwo = question.optionTwo.votes.find(
    (elem) => elem === authedUser
  );

  console.log(
    "QuestionResult opt1 ",
    votedForOptionOne,
    " opt2: ",
    votedForOptionTwo
  );

  return (
    <Card>
      <CardContent>
        <p>Asked by {authorUser.name}</p>
      </CardContent>
      <Divider />
      <CardContent>
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
            <div className={classes.flexRow}>
              <Typography variant="h6">Results:</Typography>
              <CardContent>
                <Paper elevation={2}>
                  {votedForOptionOne ? <YourVote /> : ""}
                  {votedForOptionTwo ? <YourVote /> : ""}
                  <p>Would you rather {question.optionOne.text}</p>
                  <LinearProgressWithLabel value={optionOnePercentage} />
                  <p>{optionOnePercentageText}</p>
                </Paper>
              </CardContent>
              <CardContent>
                <Paper elevation={2}>
                  Would you rather {question.optionTwo.text}
                  <LinearProgressWithLabel value={optionTwoPercentage} />
                  <p>{optionTwoPercentageText}</p>
                </Paper>
              </CardContent>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  return {
    authedUser,
    question: questions[questionId],
    authorUser: users[questions[questionId].author],
  };
}

export default connect(mapStateToProps)(QuestionResult);
