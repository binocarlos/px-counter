var args = require('minimist')(process.argv, {
  alias:{
    p: 'port',
    f: 'filepath',
    t: 'test'
  },
  default:{
    port: process.env.LISTEN_PORT || 8080,
    filepath: process.env.FILEPATH || '/tmp/px-counter-items.json'
  },
  boolean:['test']
})

if(process.env.NODE_ENV == 'test') {
  args.test = true
}

module.exports = args