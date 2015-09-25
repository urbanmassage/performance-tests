var Rabbitr = require('rabbitr');

var runner = require('./runner');

var channel = 'performance-test';

var opts = {
  host: process.env.RABBITMQ_HOST || 'localhost',
};

var s = '';

while (s.length < 10 * 1024) {
  s += Math.random();
}

s = {t:s};

if (typeof (process.env.RABBITMQ_URL) === 'string') {
  opts = {
    url: process.env.RABBITMQ_URL,
  };
}

var rabbit = new Rabbitr(opts);

rabbit.on('error', function(err) {
  throw err;
});

module.exports = runner(function listen(next) {

  rabbit.rpcListener(channel, { prefetch: 100 }, function(message, done) {
    message.queue.shift();
    done(null, s);
  });

  setTimeout(next, 200);
}, function runOnce(i, next) {

  rabbit.rpcExec(channel, s, next);
});

if (require.main === module) module.exports.run();
