var http = require('http');
var request = require('request');

var runner = require('./runner');

var PORT = 9991;

module.exports = runner(function listen(next) {

  http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({test:true}));
    response = null;

  }).listen(PORT);

  next();
}, function runOnce(i, next) {

  request({
    url: 'http://127.0.0.1:'+PORT,
    json: true,
  }, next);
});

if (require.main === module) module.exports.run();
