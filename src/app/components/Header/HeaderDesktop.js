import React, { Component } from 'react'
import Search from '../Search'
// import logo from '../../commonResources/logo.png'

class HeaderDesktop extends Component {
  state = {
    dropDownVisible: false,
    hideDropDownTimer: null,
    isDark: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
   window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.scrollY > 50) {
      this.setState({isDark: true})
    } else {
      this.setState({isDark: false})
    }
  }

  showDropDown = () => {
    this.cancelHideTimer();
    this.setState({
      dropDownVisible: true
    });
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

  openDonate() {
    window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=C2RM2YGUT3AEL");
  }

  openRadio() {
    window.open("http://eternityreadyradio.com/player/");
  }

  openTv() {
    window.open("http://www.eternityready.com/beta/");
  }

  render() {

    const dropDownStyle = {
      'display': this.state.dropDownVisible ? 'block' : 'none'
    };

    const headerStyle = this.state.isDark ? 'headerDesktop headerDesktopOpaque' : 'headerDesktop'
    return (
        <div className={headerStyle} ref={(c) => this._header = c} >
          <img src={require("../../commonResources/logo.png")} style={{width: 105}} alt="Enternity Ready Logo" />
          <span>
            <span className="dropdown mainMenuLink" onTouchStart={this.dropDownTouch} onMouseEnter={this.showDropDown} onMouseLeave={this.timerHide}></span>
            <div className="dropdiv" style={dropDownStyle} onMouseEnter={this.cancelHideTimer} onMouseLeave={this.timerHide}>
              <ul className="sectiondrop">
                <li><a href="http://www.eternityready.org/devices" target="_blank">How to Watch</a></li>
                <li><a href=""></a></li>
                <li><a href="http://www.eternityready.org/production" target="_blank">Originals</a></li>
                <li><a href=""></a></li>
                <li><a href="http://www.eternityready.org/lineup.pdf" target="_blank">TV Line Up</a></li>
              </ul>
              <ul className="sectiondrop">
                <li><a href="#">Faith &amp; Ministry</a></li>
                <li><a href="#">Kids &amp; Family</a></li>
                <li><a href="#">Bible Prophecy</a></li>
                <li><a href="#">News &amp; Politics</a></li>
                <li><a href="#">Movies &amp; Music</a></li>
              </ul>
              <ul className="sectiondrop">
                <li><a href="#">Gaming &amp; Technology</a></li>
                <li><a href="#">Health &amp; Sports</a></li>
                <li><a href="#">International Networks</a></li>
                <li><a href="#">Premium Channels</a></li>
                <li><a href="#">All Channnels</a></li>
              </ul>
            </div>
            <Search device="desktop"/>
            <span className="mainMenuLink" onClick={this.openRadio}>Radio</span>
            <span className="mainMenuLink" onClick={this.openTv}>Old Version</span>
            <span className="mainMenuLink" onClick={this.openDonate}>Donate</span>
          </span>
        </div>
    );
  }
}

export default HeaderDesktop
