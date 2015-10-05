var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var num = '125124112';

suite
.add('#parseInt', function() {
  return parseInt(num);
})
.add('#parseFloat', function() {
  return parseFloat(num);
})
.add('+', function() {
  return +num;
})
.add('n|0', function() {
  return num|0;
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
