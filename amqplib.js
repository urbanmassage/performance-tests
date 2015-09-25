var amqp = require('amqplib/callback_api');

var runner = require('./runner');

var channel = 'performance-test';

var url = 'amqp://localhost';
if(process.env.RABBITMQ_HOST) {
  url = 'amqp://' + process.env.RABBITMQ_HOST;
}
if (process.env.RABBITMQ_URL) {
  url = process.env.RABBITMQ_URL;
}

var connection;

runner(function listen(next) {

  amqp.connect(url, function(err, conn) {
    if (err) throw err;

    connection = conn;

    conn.createChannel(function on_open(err, ch) {
      if (err) throw err;

      ch.assertQueue(channel);
      ch.consume(channel, function(msg) {
        if (msg !== null) {
          console.log('new message: ', msg.content.toString());
          ch.ack(msg);
        }
      });
    });

    next();
  });
}, function runOnce(i, next) {

  connection.createChannel(function on_open(err, ch) {
    if (err) throw err;

    ch.assertQueue(channel);
    ch.sendToQueue(channel, new Buffer('something to do'), {}, function(err, ok) {
      if (err) throw err;
      console.log(ok, 'ok');

      next();
    });
  });
});
