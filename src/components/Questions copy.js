import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FaRegCheckCircle }  from 'react-icons/fa'
// import { Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


import { handleAddVote } from '../actions/questions'
import { handleAddVoteToUser } from '../actions/users'
import PageNotFound from '../components/PageNotFound'
import { DEFAULT_AVATAR } from '../utils/constants'
import { styles } from '../utils/styles'

class Questions extends Component {
  handleAddVote (vote) {
    const { authedUser, question, dispatch, users } = this.props
    dispatch(handleAddVote(question, vote, authedUser))
    dispatch(handleAddVoteToUser(question, vote, authedUser, users))
  }

  render () {
    const { authedUser, question, users } = this.props
    if (!question) { return <PageNotFound /> }

    const questionAuthor = users.find(user => user.id === question.author)

    // Create the votes variables
    const optionOneNum = question.optionOne.votes ? question.optionOne.votes.length : 0
    const optionTwoNum = question.optionTwo.votes ? question.optionTwo.votes.length : 0
    const TotalNum = optionOneNum + optionTwoNum
    const optionOnePercent = TotalNum ? Math.floor((optionOneNum / TotalNum) * 100) : 0
    const optionTwoPercent = TotalNum ? Math.floor((optionTwoNum / TotalNum) * 100) : 0
    const showVotes = optionOneNum || optionTwoNum
    const alreadyVoted = question.optionOne.votes.includes(authedUser) ||
                         question.optionTwo.votes.includes(authedUser)

    return (
      <Card>
        <CardContent>
        <Typography
          subtitle={`by ${questionAuthor.name}`}
          avatar={questionAuthor ? questionAuthor.avatarURL : DEFAULT_AVATAR}
          data-tip={questionAuthor.name}
        >Would you rather</Typography>
        <Typography
          title=''
          subtitle={`${question.optionOne.text} or ${question.optionTwo.text}?`}
        />
        <Typography>
          {showVotes && question.optionOne.votes.includes(authedUser) && <FaRegCheckCircle className='check-icon' /> }
          {showVotes && <span style={styles.indentQuestion}>
            Option1: {question.optionOne.text}<br />
            {optionOneNum} Votes<br />
            {optionOnePercent}% Selected<br />
            </span>
          }
        </Typography>
        <Typography>
          {showVotes && question.optionTwo.votes.includes(authedUser) && <FaRegCheckCircle className='check-icon' /> }
          {showVotes && <span style={styles.indentQuestion} >
            Option2: {question.optionTwo.text}<br />
            {optionTwoNum} Votes<br />
            {optionTwoPercent}% Selected<br />
            </span>
          }
        </Typography>
        </CardContent>
        <CardActions>
          <Button>
            label="Vote #1"
            onClick={() => this.handleAddVote('optionOne')}
            disabled={alreadyVoted}
          >
          </Button>
          <Button
            label="Vote #2"
            onClick={() => this.handleAddVote('optionTwo')}
            disabled={alreadyVoted}
          />
        </CardActions>
      </Card>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { questionId }) {

  return {
    authedUser,
    users: Object.values(users),
    question: questions[questionId]
  }
}

export default connect(mapStateToProps)(Questions)
