var async = require('async');
var chalk = require('chalk');
var fs = require('fs')

async.mapSeries([
  'amqplib',

  'express',
  'express-b',

  'http',
  'http-b',

  'rabbit',
  'rabbit-b',
], function(file, next) {
  console.log('Running %s', chalk.cyan(file));

  var m = require('./tests/' + file);
  m.execute(function(results) {
    results.name = file;

    next(null, results);
  });
}, function(err, results) {

  var
    dur = results.reduce(function(a,b) { return a + b.dur; }, 0) / results.length,
    min = results.reduce(function(a,b) { return a + b.min; }, 0) / results.length,
    avg = results.reduce(function(a,b) { return a + b.avg; }, 0) / results.length,
    max = results.reduce(function(a,b) { return a + b.max; }, 0) / results.length,

    b_dur = results.reduce(function(a,b) { return Math.min(a, b.dur); }, Infinity),
    b_min = results.reduce(function(a,b) { return Math.min(a, b.min); }, Infinity),
    b_avg = results.reduce(function(a,b) { return Math.min(a, b.avg); }, Infinity),
    b_max = results.reduce(function(a,b) { return Math.min(a, b.max); }, Infinity);

  function c(a, b, c) {
    if (a === c) return chalk.green(a);
    if (a > b) return chalk.red(a);
    return chalk.blue(a);
  }

  var html = '<html><head><title>Performance Tests | Urban Massage</title></head><body><pre>';

  results.forEach(function(result) {
    html += '%s\t in %sms\tmin %s\tavg\t%s max\t%s', chalk.cyan(result.name), c(result.dur, dur, b_dur), c(result.min, min, b_min), c(result.avg, avg, b_avg), c(result.max, max, b_max);
  });

  html += '</pre></body></html>';

  fs.writeFile('new_index.html', html, function(err){
    if (err) {
      console.error(err.stack);
      process.exit(1);
    }
    process.exit();
  });
});