var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var num = '125124112';

function parsePlus(n) {
  return +n;
}

function parse0(n) {
  return n|0;
}

suite
.add('#parseInt', function() {
  return parseInt(num);
})
.add('#parseFloat', function() {
  return parseFloat(num);
})
.add('+', function() {
  return parsePlus(num);
})
.add('n|0', function() {
  return parse0(num);
})

.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
