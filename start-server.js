global.__SERVER__ = true;
if (process.env.NODE_ENV == 'development') {
    require('./dev-env-vars.js');
}
// require('babel-register');
// require('ignore-styles').default(['.sass', '.scss', '.styl']);
var appPort = process.env.PORT || 3030;
var app = require('./src/server').default;

app.listen(appPort, function () {
  console.log('current mode is ' + process.env.NODE_ENV);
  console.log('server is running at ' + appPort);
});

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});