var async = require('async');
var chalk = require('chalk');
var fs = require('fs')

function color(name, value) {
  return '<span class="'+name+'">'+value+'</span>';
}

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
    if (a === c) return color('green', a);
    if (a > b) return color('red', a);
    return color('blue', a);
  }

  var html = '<html><head><title>Performance Tests | Urban Massage</title>';

  html += '<style>' +
            'html {margin: 0; padding: 0; background: #ccc;}' +
            'body {margin: 0; padding: 20px;}' +
            'h1 {margin: 0 0 1.5em}' +
            'pre {margin: 0 auto; padding: 20px; background: #fff; width: 600px; max-width: 100%}' +
            'table {width: 100%}' +
            'th, td {text-align: right}' +
            'th:first-child {text-align: left}' +
            '.red {color: red}' +
            '.gray {color: #666}' +
            '.green {color: green}' +
            '.blue {color: blue}' +
          '</style>';

  html += '</head><body><pre>';

  html += '<h1>Performance Tests</h1>';

  html += '<table>';
  html += '<thead>';
    html += '<tr>';
    html += '<th>name</th>';
    html += '<th>dur</th>';
    html += '<th>min</th>';
    html += '<th>avg</th>';
    html += '<th>max</th>';
    html += '</tr>';
  html += '</thead>';

  html += '<tbody>';
  results.forEach(function(result) {
    html += '<tr>';
    html += '<th>' + color('gray', result.name) + '</th>';
    html += '<td>' + c(result.dur, dur, b_dur) + 'ms</td>';
    html += '<td>' + c(result.min, min, b_min) + 'ms</td>';
    html += '<td>' + c(result.avg, avg, b_avg) + 'ms</td>';
    html += '<td>' + c(result.max, max, b_max) + 'ms</td>';
    html += '<tr>';
  });
  html += '</tbody>';
  html += '</table>';

  html += '<br /><a href="https://github.com/urbanmassage/performance-tests/">Source Code</a>';

  html += '</pre></body></html>';

  fs.writeFile('new_index.html', html, function(err){
    if (err) {
      console.error(err.stack);
      process.exit(1);
    }
    process.exit();
  });
});
