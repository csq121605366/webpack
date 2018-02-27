module.exports = function (css) {
    console.log(css);
    console.log(window.innerWidth);
    if(window.innerWidth>=768){
        return css.replace('green', 'yellow');
    }else{
        return css.replace('green', 'gray');
    }
}