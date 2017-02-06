var args = require('minimist')(process.argv, {
  alias:{
    p: 'port',
    f: 'filepath',
    t: 'test'
  },
  default:{
    port: 8080,
    filepath: '/tmp/px-counter-items.json'
  },
  boolean:['test']
})

module.exports = args