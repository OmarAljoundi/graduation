import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Nav from './Views/Nav'
class Home extends Component {
  componentDidMount() {
    document.body.classList.add('Home')
  }
  componentWillUnmount() {
    document.body.classList.remove('Home')
  }
  render() {
    const { isUserLoggedin, authedUser } = this.props
    if (isUserLoggedin === false) {
      return <Navigate to="/login" />
    }
    return <Nav name={authedUser.name} role={authedUser.role} />
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isUserLoggedin: authedUser ? authedUser.signin : false,
    authedUser
  }
}

export default connect(mapStateToProps)(Home)
