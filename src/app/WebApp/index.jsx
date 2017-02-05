import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import style from './style.css';
import bootstrapStyle from './resources/bootstrap/bootstrap.css';
import bootstrapThemeStyle from './resources/bootstrap/bootstrap-theme.css';

export default class WebApp extends Component {
  render() {
    return (
      <div>
          {/*<h1>MAIN APP HEADER</h1>*/}
          <Header />
            {this.props.children}
          <Footer />
      </div>
    );
  }
}


