//es module
import sum from './sum';
//commonjs
var minus = require('./minus');
//amd
require(['./muti'], function (muti) {
    console.log(muti);
    console.log('muti(2,3) = ', muti(2, 3));
})

console.log(sum);
console.log(minus);

console.log('sum(23,24) = ', sum(23, 24));
console.log('minus(24,17) = ', minus(24, 17));