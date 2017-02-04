/* @flow */
global.__SERVER__ = true;
require('es6-promise').polyfill();
require('fetch-everywhere');
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import express from 'express';
import useragent from 'express-useragent';
import graphqlHTTP from 'express-graphql';
import AppContainer from '../app/AppContainer';
import schema from './schema';
import connection from './dbConnection';
import routes from '../app/routes.jsx';

var STATIC_ASSETS_CDN = process.env.STATIC_ASSETS_CDN || '';
var WEBPACK_ASSETS = process.env.WEBPACK_ASSETS || '';
global.__currentRequestUserAgent__ = '';
const app = express();
app.use(express.static('www'));
app.use(useragent.express());
app.use('/graphql', graphqlHTTP({
  schema,
  context: { connection },
  graphiql: true
}));
app.get('*', (req, res) => {
  global.__currentRequestUserAgent__ = req.useragent;
  match({ routes: routes({}), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      var showToServer = (data) => {
        const markup = ReactDOM.renderToString(<AppContainer initialData={data.data} initialDataRoute={renderProps.location.pathname} renderProps={renderProps} />);
        const __initial_DATA__ = JSON.stringify({route: renderProps.location.pathname, data: data.data});
        res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Eternity Ready</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" type="text/css" href="${STATIC_ASSETS_CDN}/styles.css">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <link rel="shortcut icon" href="favicon.ico" />
  </head>
  <body>
    <div id="root">${markup}</div>
    <script id='app-props' type='application/json'><![CDATA[${__initial_DATA__}]]></script>
    <script type="text/javascript" src="${WEBPACK_ASSETS}/app.js"></script>
  </body>
</html>
    `);
      };
      // TODO: remove the double render (somehow traverse react components without render or cache route queries on build?)
      // renderToString seems faster than renderToStaticMarkup
      ReactDOM.renderToString(<AppContainer dataCallBack={showToServer} renderProps={renderProps} />);

    } else {
      res.status(404).send('Not found')
    }
  })
});

export default app;
