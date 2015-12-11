var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var n = -10000000000000;

suite
.add('Math.abs', function() {
  return Math.abs(n);
})
.add('n ?: -n', function() {
  return n > 0 ? n : -n;
})

.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
