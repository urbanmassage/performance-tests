var express = require('express');
var request = require('request');

var runner = require('./runner');

var PORT = 9990;

module.exports = runner(function listen(next) {

  var app = express();

  app.get('/', function(req, res){
    res.send({test:true});
  });

  app.listen(PORT);
  next();
}, function runOnce(i, next) {

  request({
    url: 'http://127.0.0.1:'+PORT,
    json: true,
  }, next);
});

if (require.main === module) module.exports.run();
