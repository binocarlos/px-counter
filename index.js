var http = require('http')
var Server = require('./server')
var args = require('minimist')(process.argv, {
  alias:{
    p: 'port',
    f: 'filepath',
    v: 'verbose'
  },
  default:{
    port: 8085,
    filepath: __dirname + '/.data/items.json'
  },
  boolean:['verbose']
})

var server = http.createServer(Server(args))

server.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
})