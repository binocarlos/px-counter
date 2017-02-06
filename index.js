var http = require('http')
var Server = require('./server')
var settings = require('./settings')
var Test = require('./test')

if(settings.test) {
  Test(settings)
}
else {
  var server = http.createServer(Server(settings))

  server.listen(settings.port, function(){
    console.log('server listening on port: ' + settings.port)
  })  
}