import * as _ from 'lodash';

console.log(_.chunk([], 2));

const NUM = 45;

interface Cat {
    name : String,
    gender : String
}

function touchCat(cat : Cat) {
    console.log('miao~', cat.name)
}

touchCat({name: "tom", gender: "male"})