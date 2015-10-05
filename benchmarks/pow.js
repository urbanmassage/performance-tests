var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

suite
.add('Math.pow', function() {
  return Math.pow(10000000000000 - 90000, 2);
})
.add('n*n', function() {
  return (10000000000000 - 90000) * (10000000000000 - 90000);
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
