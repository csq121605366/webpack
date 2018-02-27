import root from './css/root.less';
import base from './css/base.css';
import common from './css/common.css';

var app = document.getElementById('app');
console.log(base);
app.innerHTML = `<div class="${base.box}"></div>`;

(
    import( /* webpackChunkName:"a" */
        './components/a').then(a => {
        console.log(a);
    }))

// import test from './css/test.useable.css'; test.use(); test.unuse(); var flag
// = false; setInterval(() => {     console.log('变化了')     if (flag) {
// test.unuse()     } else {         test.use()     }     flag = !flag; }, 500);