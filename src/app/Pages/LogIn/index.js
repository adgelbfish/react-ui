import React, { Component, PropTypes } from 'react'
import { container } from '../../../Adrenaline'
import Login from '../../components/LogIn'

class LoginPage extends Component {

  render() {
    return (
      <Login />
    )
  }
}

export default container({
  query: `
    query {
      noop
    }
  `
})(LoginPage);