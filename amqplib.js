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

runner(function listen(next) {

  amqp.connect(url).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });

    connection = conn;

    return conn.createChannel();
  }).then(function on_open(ch) {
    function reply(msg) {
      console.log(' [x] Responding to (%s)', msg.content);
      ch.sendToQueue(msg.properties.replyTo,
                     new Buffer(JSON.stringify({ test: true, })),
                     {correlationId: msg.properties.correlationId});
      ch.ack(msg);
    }

    return ch.assertQueue(channel, {durable: false}).then(function() {
      ch.prefetch(10);
      return ch.consume(channel, reply);
    }).then(function() {
      console.log(' [x] Awaiting RPC requests');
    });
  }).then(function() {next();}, next);
}, function runOnce(i, next) {

  connection.createChannel().then(function on_open(ch) {
    var answer = defer();
    var corrId = uuid();
    function maybeAnswer(msg) {
      if (msg.properties.correlationId === corrId) {
        answer.resolve(msg.content.toString());
      }
    }

    var ok = ch.assertQueue('', {exclusive: true})
      .then(function(qok) { return qok.queue; });

    ok = ok.then(function(queue) {
      return ch.consume(queue, maybeAnswer, {noAck: true})
        .then(function() { return queue; });
    });

    ok = ok.then(function(queue) {
      console.log(' [x] Requesting (%d)', i);

      ch.sendToQueue('rpc_queue', new Buffer(JSON.stringify({ test: true, })), {
        correlationId: corrId, replyTo: queue
      });
      return answer.promise;
    });

    return ok.then(function(fibN) {
      console.log(' [.] Got %d', fibN);
    });
  }).then(function() {
    next();
  }, next);
});
