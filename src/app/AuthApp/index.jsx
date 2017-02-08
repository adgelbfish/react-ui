import React, { Component } from 'react';

import style from './style.css';
import bootstrapStyle from '../WebApp/resources/bootstrap/bootstrap.css';
import bootstrapThemeStyle from '../WebApp/resources/bootstrap/bootstrap-theme.css';

export default class AuthApp extends Component {
  render() {
    return (
      <div>
          <header id="header">
              <nav className="navbar navbar-default">
                <div className="container">
                  <a className="navbar-brand" href="#"><img src="http://www.raptureready.tv/ee619ab22c4cca7ae28fa7fc2a60e4e2.png" id="logo" alt="Eternity Ready" /></a>
                </div>
              </nav>
          </header>
            {this.props.children}
          <footer className="footer">
            <div className="container">
                <div className="col-xs-6 col-md-4 bg-primary">
                  <h4>About Us</h4>
                  <ul className="footer-menu">
                      <li><a href="#">link</a></li>
                  </ul>
                </div>
                <div className="col-xs-6 col-md-4 bg-primary">
                <h4>About Us</h4>
                  <ul className="footer-menu">
                      <li><a href="//eternityready.com/channels/lineup.pdf" target="_blank">Channel Lineup</a></li>
                  </ul>
                </div>
                <div className="col-xs-6 col-md-4 bg-primary">
                  <h4>About Us</h4>
                  <ul className="footer-menu">
                      <li><a href="#">link</a></li>
                  </ul>
                </div>
            </div>
          </footer>
      </div>
    );
  }
}


