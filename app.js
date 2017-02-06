var http = require('http')
var Server = require('./server')

module.exports = function(settings) {
  var server = http.createServer(Server(settings))

  server.listen(args.port, function(){
    console.log('server listening on port: ' + args.port)
  })  
}
