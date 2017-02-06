var tape = require('tape')
var http = require('http')
var request = require('request')
var Server = require('./server')



module.exports = function(settings) {

  var server = null

  var items1 = 0
  var items2 = 0

  tape('setup server', function(t) {
    server = http.createServer(Server(settings))

    server.listen(8080, function(err){  
      if(err) t.error(err)
      t.end()
    })
  })

  tape('sanity', function(t) {
    request({
      method: 'GET',
      url: 'http://127.0.0.1:8080'
    }, function(err, response) {
      t.equal(response.statusCode, 200, '200 code')
      t.end()
    })
  })

  tape('list items', function(t) {
    request({
      method: 'GET',
      url: 'http://127.0.0.1:8080/v1/items',
      json: true
    }, function(err, response, body) {
      items1 = body
      console.log('# HAVE ' + body.length + ' existing items')
      t.end()
    })
  })

  tape('post item', function(t) {
    request({
      method: 'POST',
      url: 'http://127.0.0.1:8080/v1/items',
      json: items1.concat([{name: 'test'}])
    }, function(err, response, body) {
      t.equal(response.statusCode, 201, '201 code')
      t.end()
    })
  })

  tape('list items', function(t) {
    request({
      method: 'GET',
      url: 'http://127.0.0.1:8080/v1/items',
      json: true
    }, function(err, response, body) {
      items2 = body
      console.log('# HAVE ' + body.length + ' items after write')
      t.equal(items2.length, items1.length + 1, 'count2 is 1 more than count1')
      t.end()
    })
  })

  tape('close server', function(t) {
    server.close()
    t.end()
  })
}
