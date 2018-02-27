// import axios from 'axios';
import './css/base.less';
import './css/fonts.less';

import Vue from 'vue';
import element from 'element-ui';
console.log(element);
/* global axios:false */
axios({
    method: 'get',
    url: '/api/test',
    params: {
        id: '4193586758833502',
        page: 1
    }
}).then(res => {
    console.log(res.data)
})
