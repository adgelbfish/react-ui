import React, {Component, PropTypes} from 'react'
import { signupUser } from '../../actions'
import { connect } from 'react-redux'
import './style.css'

class Signup extends Component {

  handleClick = () => {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }

  render () {
    const { errorMessage } = this.props

    return (
      <div className="login">
        <form>
          <h1 className="login-heading">Sign Up</h1>
          <label className="login-inputgroup">
            <span>Email</span>
            <input type="text" className="login-input" ref="username"/>
          </label>
          <label  className="login-inputgroup">
            <span>Password</span>
            <input type="password" className="login-input" ref="password"/>
          </label>
          <button type="button" className="btn btn-light login-button" onClick={this.handleClick}>Sign UP</button>
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