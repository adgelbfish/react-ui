import React, {Component, PropTypes} from 'react'
import { loginUser } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import validator from 'validator'
import './style.css'

class Login extends Component {
    constructor () {
    super()
    this.state = {
      canSubmit: false,
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      }
    }
  }

  handleEmail = (e) => {
    let value = e.target.value.trim()
    if (validator.isEmail(value)) {
      this.setState({
        email: {
          error: '',
          value: value,
          valid: true
        }
      })
    } else {
      this.setState({
        email: {
          ...this.state.email,
          error: `${value} is not a valid email`
        } 
      })
    }

    this.setState({
      canSubmit: validator.isEmail(value) && !this.state.password.error && this.state.password.value.length > 0
    })
  }

  handlePassword = (e) => {
    let value = e.target.value.trim()
    if (value.length >= 4 && value.length <= 60) {
      this.setState({
        password: {
          error: '',
          value: value,
          valid: true
        }
      })
    } else {
      this.setState({
        password: {
          ...this.state.password,
          error: `Your password must contain between 4 and 60 characters`
        } 
      })
    }
    this.setState({
      canSubmit: !this.state.email.error && value.length >= 4 && value.length <= 60 
    })
  }

  handleClick = () => {
    if (this.state.canSubmit){
      const creds = { username: this.state.email.value, password: this.state.password.value }
      this.props.onLoginClick(creds)
    } else {
      this.setState({
        password: {
          ...this.state.password,
          error: `Please correctly input your email and password`
        } 
      })
    }
  }

  render () {
    const { errorMessage } = this.props

    return (
      <div className="login">
        <form>
          <h1 className="login-heading">Log in</h1>
          <label className="login-inputgroup">
            <span>Email</span>
            <input type="text" className="login-input" onChange={this.handleEmail}/>
            {this.state.email.error &&
              <p className="login-error">{this.state.email.error}</p>
            }
          </label>
          <label  className="login-inputgroup">
            <span>Password</span>
            <input type="password" className="login-input"  onBlur={this.handlePassword}/>
            {this.state.password.error &&
              <p className="login-error">{this.state.password.error}</p>
            }
          </label>
          <button type="button" className="btn btn-light login-button" onClick={this.handleClick}>Log In</button>
          {errorMessage &&
            <p className="login-error">{errorMessage}</p>
          }
        </form>
        <p class="signup-link">Do not have an account? <Link to={`/signup`}>Sign up now.</Link></p>
      </div>
    )
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (creds) => {
    dispatch(loginUser(creds))
  }
})

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)