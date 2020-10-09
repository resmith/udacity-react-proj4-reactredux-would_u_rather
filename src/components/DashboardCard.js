import React from "react";
import { Link } from "@reach/router";

import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
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

const DashboardCard = ({ question, user }) => {
  const classes = useStyles();

  if (question === null) {
    return <p>This Question doesn't exist</p>;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {user.name} asks:
        </Typography>
      </CardContent>
      <Divider />
      <div className={classes.flexContainer}>
        <div className={classes.flexCol1}>
          <CardContent>
            {user.avatarURL ? <Avatar src={user.avatarURL} /> : ""}
          </CardContent>
        </div>

        <div className={classes.flexCol2}>
          <CardContent>
            <p>Would you rather </p>
            <p>...{question.optionOne.text}...</p>
            <Link to={`/questions/${question.id}`} className="question">
              <Button variant="contained">View Poll</Button>
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
