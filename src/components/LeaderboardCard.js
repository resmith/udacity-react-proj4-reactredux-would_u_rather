import React from "react";

import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderColor: grey,
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

const LeaderboardCard = ({ user }) => {
  const classes = useStyles();

  if (user === null) {
    return <p>No user ;(</p>;
  }

  return (
    <Card className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.flexCol1}>
          <CardContent>
            {user.avatarURL ? <Avatar src={user.avatarURL} /> : ""}
          </CardContent>
        </div>

        <div className={classes.flexCol2}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Table>
              <TableBody>
                <TableRow key="Answered">
                  <TableCell>Answered Questions</TableCell>
                  <TableCell>{Object.keys(user.answers).length}</TableCell>
                </TableRow>
                <TableRow key="Created">
                  <TableCell>Created Questions</TableCell>
                  <TableCell>{user.questions.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardContent>
            <Typography>Score</Typography>
            <div className="userScore">
              {Object.keys(user.answers).length + user.questions.length}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default LeaderboardCard;
