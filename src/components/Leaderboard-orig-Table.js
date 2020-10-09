import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const showCheckboxes = false;

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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Pic</TableCell>
                <TableCell>Questions</TableCell>
                <TableCell>Votes</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.avatarURL ? (
                      <img
                        src={user.avatarURL}
                        className="avatar"
                        alt={user.name}
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>{user.questions.length}</TableCell>
                  <TableCell>{Object.keys(user.answers).length}</TableCell>
                  <TableCell>
                    {Object.keys(user.answers).length + user.questions.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
