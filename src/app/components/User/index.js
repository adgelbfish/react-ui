import React, { Component } from 'react'
import { logoutUser } from '../../actions'
import { connect } from 'react-redux'
import './style.css'

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dropDownVisible: false,
      hideDropDownTimer: null
    }
  }

  timerHide = () => {
    var self = this;
    this.setState({
      hideDropDownTimer: setTimeout(function() {
        if(self.state.hideDropDownTimer !== null) {
          self.hideDropDown();
        }
      }, 1000)
    })
  }

  dropDownTouch(e) {
    this.toggleDropDownMenu();
  }

  toggleDropDownMenu = () => {
    this.setState({
      dropDownVisible: !this.state.dropDownVisible
    })
  }

  cancelHideTimer = () => {
    this.setState({
      hideDropDownTimer: null
    })
  }

  hideDropDown = () => {
    this.setState({
      dropDownVisible: false
    });
  }

  showDropDown = () => {
    this.cancelHideTimer();
    this.setState({
      dropDownVisible: true
    });
  }

  render () {
    const dropDownStyle = {
      'display': this.state.dropDownVisible ? 'block' : 'none'
    };

    return (
      <div className="user-control">
        <span className="user" onTouchStart={this.dropDownTouch} onMouseEnter={this.showDropDown} onMouseLeave={this.timerHide}>
          {this.props.username}
        </span>
        <div className="user-drop" style={dropDownStyle} onMouseEnter={this.cancelHideTimer} onMouseLeave={this.timerHide}>
          <div className="user-drop-section">
            <span onClick={this.props.logout} className="user-logout">Log Out</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username.split('@')[0]
})

const mapDispatchToProps = (dispatch) => ({
  logout : () => {
    dispatch(logoutUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)