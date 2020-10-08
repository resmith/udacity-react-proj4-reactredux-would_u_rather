import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

// import Question from './Question'

const UNANSWERED = "unanswered";
const ANSWERED = "answered";

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
  state = { questions: UNANSWERED };

  handleChange = (event, index, value) => this.setState({ questions: value });

  render() {
    const { authedUser, questions } = this.props;
    return (
      <div>
        <h3 className="center">The Questions</h3>
        <DropDownMenu value={questions} onChange={this.handleChange}>
          <MenuItem value={UNANSWERED} primaryText="Unanswered Questions" />
          <MenuItem value={ANSWERED} primaryText="Answered Questions" />
        </DropDownMenu>
        <ul className="dashboard-list">
          {questions &&
            questions === UNANSWERED &&
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
    questions,
  };
}

// questions: Object.values(questions)

export default connect(mapStateToProps)(Dashboard);
