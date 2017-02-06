var http = require('http')
var Server = require('./server')
var settings = require('./settings')
var Test = require('./test')

function runServer() {
  var server = http.createServer(Server(settings))

  server.listen(settings.port, function(){
    console.log('server listening on port: ' + settings.port)
  })
}

if(settings.test) {
  Test(Object.assign({}, settings, {
    port: 8088
  }), runServer)
}
else {
  runServer()
}
