var amqp = require('amqplib');
var when = require('when');
var defer = when.defer;
var uuid = require('node-uuid');

var runner = require('./runner');

var channel = 'performance-test-amqp';

var url = 'amqp://localhost/';
if (process.env.RABBITMQ_HOST) {
  url = 'amqp://' + process.env.RABBITMQ_HOST;
}

if (process.env.RABBITMQ_URL) {
  url = process.env.RABBITMQ_URL;
}

var connection;

module.exports = runner(function listen(next) {

  amqp.connect(url).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });

    connection = conn;

    return conn.createChannel().then(function(ch) {

      function reply(msg) {
        ch.sendToQueue(msg.properties.replyTo,
                       new Buffer('hi test'),
                       {correlationId: msg.properties.correlationId});
        ch.ack(msg);
      }

      return ch.assertQueue(channel, {durable: false}).then(function() {
        ch.prefetch(1);
        return ch.consume(channel, reply);
      });
    });
  }).then(function() {next();}, next);
}, function runOnce(i, next) {
  connection.createChannel().then(function(ch) {
    var answer = defer();
    var corrId = uuid();

    function maybeAnswer(msg) {
      if (msg.properties.correlationId === corrId) {
        answer.resolve(msg.content.toString());
      }
    }

    return ch.assertQueue('', {exclusive: true})
    .then(function(qok) { return qok.queue; })
    .then(function(queue) {
      return ch.consume(queue, maybeAnswer, {noAck: true})
        .then(function() { return queue; });
    }).then(function(queue) {
      ch.sendToQueue(channel, new Buffer('test'), {
        correlationId: corrId, replyTo: queue
      });
      return answer.promise;
    }).then(function(response) {
      next(null, response);
    }).catch(next);
  });
});

if (require.main === module) module.exports.run();
