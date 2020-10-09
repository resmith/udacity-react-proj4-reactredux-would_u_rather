import React, { Component } from "react";
import { connect } from "react-redux";

import LeaderboardCard from "./LeaderboardCard";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    //  ***  Tally up the questions and votes
    const leaderboard = users.sort(
      (a, b) =>
        Object.keys(b.answers).length +
        b.questions.length -
        (Object.keys(a.answers).length + a.questions.length)
    );

    return (
      <div>
        <h2>Leaderboard</h2>
        {leaderboard.map((user) => (
          <LeaderboardCard key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
  // const question = Leaderboard[id]

  return {
    authedUser,
    users: Object.values(users),
    questions,
  };
}

export default connect(mapStateToProps)(Leaderboard);
