import base from './css/base.less';
import fonts from './css/fonts.less';

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);

import {a} from './common/util';
console.log(a());

import chunk from 'lodash/chunk';
console.log(chunk([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
], 2));

// in a module
console.log($('.box')); // <= 起作用
console.log(jQuery('.box')); // <= 起作用
// $ 自动被设置为 "jquery" 输出的内