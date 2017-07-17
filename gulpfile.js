let gulp = require('gulp');
let del  = require('del');
let minify = require('gulp-minify');
let concat = require('gulp-concat');
let sequence = require('run-sequence');
let sass = require('gulp-sass');
let ts = require('gulp-typescript');


//Compiling Sass
gulp.task('node-sass', function(){
    return gulp.src('backend-server/assets/styles/*.scss')
        .pipe(concat('main.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('backend-server/assets/styles'));
})

//Watching Sass for changes
gulp.task('sass:watch', function(){
    gulp.watch(['backend-server/assets/styles/*.scss'], ['node-sass']);
});


//Default Exec
gulp.task('default', [ 'node-sass', 'sass:watch']);