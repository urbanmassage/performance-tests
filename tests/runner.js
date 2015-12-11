var async = require('async');

module.exports = function runner(listen, run, cleanup) {
  function execute(done) {
    listen(function() {

      var count = parseInt(process.env.COUNT) || 1000;
      var concurrency = parseInt(process.env.CONCURRENCY) || 10;
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
        if (cleanup) cleanup();

        if (err) throw err;

        var end = +new Date();

        var min = Infinity, max = 0, sum = 0;
        results.forEach(function(result) {
          min = Math.min(min, result);
          max = Math.max(max, result);
          sum += result;
        });

        var avg = sum / results.length;

        done({
          count: count,
          start: start,
          end: end,
          dur: end - start,
          concurrency: concurrency,
          min: min,
          max: max,
          avg: avg,
        });
      });
    });
  }

  return {
    run: function() {
      execute(function(results) {
        var count = results.count,
            start = results.start,
            end = results.end,
            dur = end - start,
            concurrency = results.concurrency,
            min = results.min,
            max = results.max,
            avg = results.avg;

        console.log('Done %d tests in %s seconds with concurrency=%d', count, dur, concurrency);
        console.log('---------------------');
        console.log('Min: %d', min);
        console.log('Max: %d', max);
        console.log('Avg: %d', avg);

        process.exit();
      });
    },
    execute: execute,
  };
};
