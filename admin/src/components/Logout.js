import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router'
import { handleResetAuthedUser } from '../actions/authedUser'
class Logout extends Component {
  componentDidMount() {
    this.props.handleResetAuthedUser()
  }
  render() {
    const { isUserLoggedin } = this.props
    if (isUserLoggedin === false) {
      return <Navigate to="/" />
    }
    return <div></div>
  }
}
function mapStateToProps({ authedUser }) {
  return {
    isUserLoggedin: authedUser ? authedUser.signin : false
  }
}

export default connect(mapStateToProps, { handleResetAuthedUser })(Logout)
