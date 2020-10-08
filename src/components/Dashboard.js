import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const UNANSWERED = 0;
const ANSWERED = 1;

const Question = (props) => {
  if (props.question === null) {
    return <p>This Question doesn't exist</p>;
  }

  return (
    // <Link to={`/questions/1234`}className='question'>
    <Link to={`/questions/${props.question.id}`} className="question">
      Would you rather {props.question.optionOne.text} or{" "}
      {props.question.optionTwo.text}?
    </Link>
  );
};

class Dashboard extends Component {
  state = { questionTab: UNANSWERED };

  handleChange = (event, newValue) => {
    this.setState({ questionTab: newValue });
  };

  render() {
    const { authedUser, questions } = this.props;

    return (
      <div>
        <h3 className="center">The Questions</h3>
        <Tabs
          value={this.state.questionTab}
          onChange={this.handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Unanswered Questions" id="unanswered" />
          <Tab label="Answered Questions" id="answered" />
        </Tabs>
        <ul className="dashboard-list">
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
                <li key={question.id}>
                  <Question question={question} />
                </li>
              ))}

          {questions &&
            this.state.questions === ANSWERED &&
            questions
              .filter(
                (question) =>
                  question.optionOne.votes.includes(authedUser) ||
                  question.optionTwo.votes.includes(authedUser)
              )
              .map((question) => (
                <li key={question.id}>
                  <Question question={question} />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questions: Object.values(questions),
  };
}

// questions: Object.values(questions)

export default connect(mapStateToProps)(Dashboard);
