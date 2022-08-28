const { watch, series, src, dest} =require('gulp');
const babelify=require('babelify');
const uglify=require('gulp-uglify');
const browserify=require('browserify');
const source=require('vinyl-source-stream');
var nodemon=require('gulp-nodemon');

function clean(cb){
    // body omitted

    console.log('clean')
    cb();
}

function javascript(){
    // body omitted
    console.log('watch javascript');
    browserify('src/index.js')
    .transform(babelify,{
        presets:['react']
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(dest('dist/'));
   
}

function css(cb){
    // body omitted
    console.log('watch css')
    cb();
}

function start(){
    console.log('start')
    nodemon({
        wath:'dist',
        script:'dist/index.js',
        ext:'js',
        env:{'NODE_ENV':'development'}
    })
}



exports.default=function(){
    start()
    // // You can use a single task
    watch('src/*.css',css);
    // Or a composed task
    watch('src/*.js',series(clean,javascript));
   
}