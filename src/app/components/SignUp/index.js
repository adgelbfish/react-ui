import React, {Component, PropTypes} from 'react'
import { signupUser } from '../../actions'
import { connect } from 'react-redux'
import validator from 'validator'
import networkLayer from 'networkLayer'
import './style.css'

class Signup extends Component {
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
      },
      passwordConfirm: {
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
      canSubmit: validator.isEmail(value) && !this.state.password.error && !this.state.passwordConfirm.error && this.state.password.value.length > 0
    })
  }

  checkEmail = () => {
    const query = `
      query ($username: String){
        user(username: $username) {
          _id
        }
      }
    `
    const varibles = {
      username: this.state.email.value 
    }
    networkLayer.performQuery('/graphql', query, varibles).then((user) => {
      if (user) {
        this.setState({
          email: {
            ...this.state.email,
            error: `This email is already registered.`
          } 
        })
      }
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
      canSubmit: !this.state.email.error && value.length >= 4 && value.length <= 60 && !this.state.passwordConfirm.error && this.state.passwordConfirm.value.length > 0
    })
  }

  handlePasswordConfirm = (e) => {
    let value = e.target.value.trim()
    if (value === this.state.password.value) {
      this.setState({
        passwordConfirm: {
          error: '',
          value: value,
          valid: true
        }
      })
    } else {
      this.setState({
        passwordConfirm: {
          ...this.state.passwordConfirm,
          error: `Your passwords must match`
        } 
      })
    }
    this.setState({
      canSubmit: !this.state.email.error && !this.state.password.error && value === this.state.password.value
    })
  }

  handleClick = () => {
    if (this.state.canSubmit){
      const creds = { username: this.state.email.value, password: this.state.password.value }
      this.props.onLoginClick(creds)
    }
  }

  render () {
    const { errorMessage } = this.props

    return (
      <div className="login">
        <form>
          <h1 className="login-heading">Sign Up</h1>
          <label className="login-inputgroup">
            <span>Email</span>
            <input type="text" className="login-input" onChange={this.handleEmail} onBlur={this.checkEmail}/>
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
          <label  className="login-inputgroup">
            <span>Password Confirm</span>
            <input type="password" className="login-input"  onChange={this.handlePasswordConfirm}/>
            {this.state.passwordConfirm.error &&
              <p className="login-error">{this.state.passwordConfirm.error}</p>
            }
          </label>
          <button type="button" className="btn btn-light login-button" disabled={!this.state.canSubmit} onClick={this.handleClick}>Sign Up</button>
          {errorMessage &&
            <p className="login-error">{errorMessage}</p>
          }
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (creds) => {
    dispatch(signupUser(creds))
  }
})

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)