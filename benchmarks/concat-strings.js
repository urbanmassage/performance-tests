var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

suite
.add('Array#join', function() {
  return ['Hello', 'World'].join(' ');
})
.add('+', function() {
  return 'Hello' + ' ' + 'World';
})

.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
