let gulp = require('gulp');
let del  = require('del');
let minify = require('gulp-minify');
let concat = require('gulp-concat');
let sequence = require('run-sequence');
let sass = require('gulp-sass');
let ts = require('gulp-typescript');

let nodeModulesPath = 'node_modules';
let libPath         = 'src/lib';

let appDest = 'public/app'
let appSrc = 'src/app';


gulp.task('clean', function () {
  return del(libPath + '/**/*', { force: true });
});
gulp.task('clean:public', function () {
  return del('public/**/*', { force: true });
});


gulp.task("copy:vendor", function() {
    return gulp
        .src([
            nodeModulesPath + '/core-js/client/**/*',
            nodeModulesPath + '/zone.js/dist/zone.js', 
            nodeModulesPath + '/systemjs/dist/system-polyfills.js', 
            nodeModulesPath + '/systemjs/dist/system.src.js'  
        ])
        .pipe(gulp.dest(libPath));
});

gulp.task('copy:rxjs', function() {
  return gulp
    .src([nodeModulesPath + '/rxjs/**/*'])
    .pipe(gulp.dest(libPath + '/rxjs'));
});
gulp.task('copy:firebase', function() {
  return gulp
    .src([nodeModulesPath + '/firebase/**/*'])
    .pipe(gulp.dest(libPath + '/firebase'));
});
gulp.task('copy:hammerjs', function() {
  return gulp
    .src([nodeModulesPath + '/hammerjs/**/*'])
    .pipe(gulp.dest(libPath + '/hammerjs'));
});

gulp.task('copy:angular', function() {
    return gulp
       .src([nodeModulesPath + '/@angular/**/*'])
       .pipe(gulp.dest(libPath + '/@angular'));
});

gulp.task('copy:socketIO', function() {
    return gulp
       .src([nodeModulesPath + '/socket.io-client/**/*'])
       .pipe(gulp.dest(libPath + '/socket.io-client'));
});

//Building the production app
gulp.task('copy:app', function() {
    return gulp
       .src([appSrc + '/**/*.js', appSrc + '/**/*.html', appSrc + '/**/*.scss'])
       .pipe(gulp.dest(appDest));
});
gulp.task('sass', function () {
  return gulp.src(['src/assets/**/*.scss', 'src/*.scss'])
    .pipe(concat('styles.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});
gulp.task('copy:style', function(){
    return gulp.src('src/styles.css').pipe(gulp.dest('public'));
});

gulp.task('copy:images', function() {
    return gulp
       .src(['src/assets/images/**/*'])
       .pipe(gulp.dest('public/assets/images'));
});
gulp.task('compress:lib', function() {
  gulp.src('src/lib/**/**/*')
    .pipe(gulp.dest('public/lib'))
});
gulp.task('copy:htmlfile', function() {
    return gulp
       .src(['src/*.html', 'src/*.ico'])
       .pipe(gulp.dest('public'));
});
gulp.task('copy:Sysjs', function() {
    return gulp
       .src(['src/*.js'])
       .pipe(gulp.dest('public'));
});
gulp.task('copy:express-assets', function(){
    return gulp.src('src/express-assets').pipe(gulp.dest('public'));
});

//Typescript compiler
gulp.task('tSCompiler', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            experimentalDecorators: true,
            module: "system"
            
        }))
        .pipe(gulp.dest('public/built'));
});

//Watching Sass for changes
gulp.task('sass:watch', function(){
    gulp.watch(['src/assets/**/*.scss', 'src/*.scss'], ['sass']);
});

// Group task
gulp.task('build', function(done){
    sequence('copy:app', 'copy:images', 'compress:lib', 'copy:Sysjs', 'copy:htmlfile', 'copy:style', 'copy:express-assets', done)
});
gulp.task('copy:libs', function (done) {
    sequence('copy:vendor', 'copy:rxjs', 'copy:angular', 'copy:firebase', 'copy:socketIO', done);
});


gulp.task('build:dev', function(){
    sequence('copy:libs', 'sass');
});
gulp.task('build:prod', function(){
    sequence('build');
});

//Default Exec
gulp.task('default', [ 'copy:libs']);