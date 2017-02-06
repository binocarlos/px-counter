var concat = require('concat-stream')
var Router = require('routes-router')
var ecstatic = require('ecstatic')
var fs = require('fs')

module.exports = function(opts){

  var router = Router()
  var fileServer = ecstatic({ root: __dirname + '/client' })
  var filePath = opts.filepath

  console.log('using filepath: ' + filePath)

  if(!fs.existsSync(filePath)) {
    console.log('creating filepath: ' + filePath)
    fs.writeFileSync(filePath, JSON.stringify([]))
  }

  router.addRoute("/v1/items", {
    GET: function (req, res) {
      fs.readFile(filePath, 'utf8', function(err, data) {
        if(err) {
          res.statusCode = 500
          res.end(err.toString())
          return
        }
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.end(data)
      })
    },
    POST: function (req, res) {
      req.pipe(concat(function(data){
        var jsonData = data.toString()
        fs.writeFile(filePath, jsonData, 'utf8', function(err) {
          if(err) {
            res.statusCode = 500
            res.end(err.toString())
            return
          }
          res.statusCode = 201
          res.setHeader('Content-type', 'application/json')
          res.end(data)
        })
      }))
    }
  })

  router.addRoute("/*", fileServer)

  return router
}
