var settings = require('./settings')
var App = require('./app')
var Test = require('./test')

if(settings.test) {
  Test(settings)
}
else {
  App(settings)
}