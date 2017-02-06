import React, { Component, PropTypes } from 'react'
import { container } from '../../../Adrenaline'
import Signup from '../../components/SignUp'

class SignupPage extends Component {

  render() {
    return (
      <Signup />
    )
  }
}

export default container({
  query: `
    query {
      noop
    }
  `
})(SignupPage);