var async = require('async');

module.exports = function(listen, run) {
  listen(function() {

    var count = process.env.COUNT || 1000;
    var concurrency = process.env.CONCURRENCY || 10;
    var results = [];

    function runOnce(i, next) {
      // if (i%100 === 0 ) console.log('attempt #%d', i);
      var start = +new Date();
      run(i, function(err) {
        var end = +new Date();
        results.push(end - start);
        next(err);
      });
    }

    var start = +new Date();

    async.timesLimit(count, concurrency || 10, runOnce, function(err) {
      if (err) throw err;

      var end = +new Date();

      var min = 0, max = 0, sum = 0;
      results.forEach(function(result) {
        min = Math.min(min, result);
        max = Math.max(max, result);
        sum += result;
      });

      var avg = sum / results.length;

      console.log('Done %d in %s seconds with concurrency=%d', count, (end - start) / 1000, concurrency);
      console.log('---------------------');
      console.log('Min: %d', min);
      console.log('Max: %d', max);
      console.log('Avg: %d', avg);

      process.exit();
    });
  });
};
