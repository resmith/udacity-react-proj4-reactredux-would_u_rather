import React, { Component } from 'react'
import { connect } from 'react-redux'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

import { DEFAULT_AVATAR } from '../utils/constants'
import { setAuthedUser } from '../actions/authedUser'

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {userId: ''};
    props.dispatch(setAuthedUser(null))
  }


  handleChange = (event, index, value) => {
    event.preventDefault()
    const { dispatch } = this.props
    this.setState({userId: value.id})
    dispatch(setAuthedUser(value))
    // if ( this.props.location.pathname === '/signin') {
    // dispatch(push('/'))
    // }
  }

  render() {
    const { users} = this.props

    return (
      <div>
        <h3 className='center'>Sign In</h3>
        { users && users.length && <div>
          <DropDownMenu
            value={this.state.userId ? this.state.userId : this.props.users[0].id }
            onChange={this.handleChange}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id} primaryText={user.name} />
            ))}
          </DropDownMenu>
          <Avatar src={users && this.state.userId && users[this.state.userId].avatarUrl
            ? users[this.state.userId].avatarUrl
            : DEFAULT_AVATAR }
          />
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users}) {
  return {
    authedUser,
    users: Object.values(users).sort(
          function(a,b) {
            return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
          } )
  }
}

export default connect(mapStateToProps)(Signin)
