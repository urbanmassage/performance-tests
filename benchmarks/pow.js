var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

function pow(a, b) {
  var x = 1, i = b;
  for (; i > 0; --i) {
    x = x * a;
  }

  return x;
}

suite
.add('Math.pow', function() {
  return Math.pow(10000000000000 - 90000, 2);
})
.add('#pow', function() {
  return pow(10000000000000 - 90000, 2);
})
.add('n*n', function() {
  return (10000000000000 - 90000) * (10000000000000 - 90000);
})

.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
