import React, {Component} from 'react';
import { Route, IndexRoute  } from 'react-router';
import WebApp from './WebApp';
import AuthApp from './AuthApp';
import Browse from './Pages/Browse';
import Player from './Pages/Player';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import Admin from './Pages/Admin';
import SearchResults from './Pages/SearchResults';
import { Adrenaline } from '../Adrenaline';

const AdrenalineContainer = (RouteComponent, props, aProps) => {
    var aaProps = props.aProps ? props.aProps : aProps;
    if (aaProps && aaProps.initialDataRoute && (aaProps.initialDataRoute != props.location.pathname)) {
        aaProps = {}
    }
    return <Adrenaline {...aaProps}><RouteComponent {...props} /></Adrenaline>
}

export default (aProps) => (
  <Route>
    <Route component={WebApp}>
        <Route path="/tv" component={(props) => AdrenalineContainer(Browse, props, aProps)} />
        <Route path="/browse" component={(props) => AdrenalineContainer(Browse, props, aProps)} />
        <Route path="/watch/:channelId" component={(props) => AdrenalineContainer(Player, props, aProps)} />
        <Route path="/search/:query" component={(props) => AdrenalineContainer(SearchResults, props, aProps)} />
    </Route>
    <Route component={AuthApp}>
      <Route path="/login" component={(props) => AdrenalineContainer(LogIn, props, aProps)} />
      <Route path="/signup" component={(props) => AdrenalineContainer(SignUp, props, aProps)} />
      <Route path="/admin" component={(props) => AdrenalineContainer(Admin, props, aProps)} />
    </Route>
  </Route>
);
