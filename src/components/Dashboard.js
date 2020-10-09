import React, { Component } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DashboardCard from "./DashboardCard";

const UNANSWERED = 0;
const ANSWERED = 1;

class Dashboard extends Component {
  state = { questionTab: UNANSWERED };

  handleChange = (event, newValue) => {
    this.setState({ questionTab: newValue });
  };

  render() {
    const { authedUser, questions, users } = this.props;

    return (
      <div>
        <h3 className="center">The Questions</h3>
        <Paper elevation={3}>
          <Tabs
            value={this.state.questionTab}
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Unanswered Questions" id="unanswered" />
            <Tab label="Answered Questions" id="answered" />
          </Tabs>

          {questions &&
            this.state.questionTab === UNANSWERED &&
            questions
              .filter(
                (question) =>
                  question.optionOne.votes.includes(authedUser) === false &&
                  question.optionTwo.votes.includes(authedUser) === false
              )
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((question) => (
                <DashboardCard
                  key={question.id}
                  question={question}
                  user={users[question.author]}
                />
              ))}

          {questions &&
            this.state.questionTab === ANSWERED &&
            questions
              .filter(
                (question) =>
                  question.optionOne.votes.includes(authedUser) ||
                  question.optionTwo.votes.includes(authedUser)
              )
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((question) => (
                <DashboardCard
                  key={question.id}
                  question={question}
                  user={users[question.author]}
                />
              ))}
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions: Object.values(questions),
    users,
  };
}

// questions: Object.values(questions)

export default connect(mapStateToProps)(Dashboard);
