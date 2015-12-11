var http = require('http');
var request = require('request');

var runner = require('./runner');

var PORT = 9991;

var s = '';

while (s.length < 100 * 1024) {
  s += Math.random();
}

module.exports = runner(function listen(next) {

  http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(s));
    response = null;
  }).listen(PORT);

  next();
}, function runOnce(i, next) {

  request({
    method: 'POST',
    url: 'http://127.0.0.1:' + PORT,
    data: JSON.stringify(s),
    json: true,
  }, next);
});

if (require.main === module) module.exports.run();
