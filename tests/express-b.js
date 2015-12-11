var express = require('express');
var request = require('request');

var runner = require('./runner');

var PORT = 9992;

var s = '';

while (s.length < 100 * 1024) {
  s += Math.random();
}

s = {t:s};

module.exports = runner(function listen(next) {

  var app = express();

  app.all('/', function(req, res) {
    res.send(s);
  });

  app.use(require('body-parser').json);

  app.listen(PORT);
  next();
}, function runOnce(i, next) {

  request({
    method: 'POST',
    url: 'http://127.0.0.1:' + PORT,
    json: true,
    data: s,
  }, next);
});

if (require.main === module) module.exports.run();
