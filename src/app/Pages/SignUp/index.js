import React, { Component, PropTypes } from 'react'
import { container } from '../../../Adrenaline'
import Signup from '../../components/SignUp'

class SignupPage extends Component {

  checkDuplicatedEmail = (username) => {
    const query = `
      query ($username: String){
        user(username: $username) {
          _id
        }
      }
    `
    const variables = {
      username: username 
    }

    this.props.mutate({ query, variables })
  }

  render() {
    return (
      <Signup checkEmail={this.checkDuplicatedEmail}/>
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