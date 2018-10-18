var gulp = require('gulp'),
refresh = require('gulp-refresh'),
stylus = require('gulp-stylus'),
include = require('gulp-include'),
prefixer = require('gulp-autoprefixer'),
coffee = require('gulp-coffee'),
header = require('gulp-header'),


opt = {
  stylus: {compress: false},
  include: {hardFail:false},
  prefixer: {
    browsers: ['last 2 versions'],
    cascade: true
  },
  coffee: {bare: true},
  header: '/*\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n\n',
},

path = {
  public: './public_html',
  src: './src'
},

watch = {
  stylus: path.src+'/stylus/**/*.styl',
  coffee: path.src+'/coffee/**/*.coffee',
  html: path.src+'/html/**/*.html'
},

src = {
  stylus: path.src+'/stylus/*.styl',
  coffee: path.src+'/coffee/*.coffee',
  html: path.src+'/html/*.html'
},

dest = {
  stylus: path.public+'/css',
  coffee: path.public+'/js',
  html: path.public
};

function errorTask(err, done) {
  console.log(err.message);
  return done();
}

function taskHtml(done) {
  return gulp.src(src.html)
    .on('end', function() { refresh.reload(); return done(); })
    .on('error', function (err) { return errorTask(err, done); })
    .pipe(include(opt.include).on('error', function(err) { return errorTask(err, done); }))
    .pipe(gulp.dest(dest.html));
}

function taskCoffee(done) {
  return gulp.src(src.coffee)
    .on('end', function() { return done(); })
    .on('error', function (err) { return errorTask(err, done); })
    .pipe(include(opt.include).on('error', function(err) { return errorTask(err, done); }))
    .pipe(coffee(opt.coffee).on('error', function(err) { return errorTask(err, done); }))
    .pipe(header(opt.header))
    .pipe(gulp.dest(dest.coffee))
    .pipe(refresh());
}

function taskStylus(done) {
  return gulp.src(src.stylus)
    .on('end', function() { return done(); })
    .on('error', function (err) { return errorTask(err, done); })
    .pipe(stylus(opt.stylus).on('error', function(err) { return errorTask(err, done); }))
    .pipe(prefixer(opt.prefixer).on('error', function(err) { return errorTask(err, done); }))
    .pipe(header(opt.header))
    .pipe(gulp.dest(dest.stylus))
    .pipe(refresh());
}

function taskReload(done) {
  refresh.reload();
  return done();
}

// Gulp Init

function taskDefault(done) {
  console.log('default');
  refresh.listen({basePath: path.public});
  gulp.watch(watch.stylus, taskStylus);
  gulp.watch(watch.html, taskHtml);
  gulp.watch(watch.coffee, taskCoffee);
  return done();
}

function taskWatch(done) {
  console.log('watch');
  refresh.listen({basePath: path.public});
  gulp.watch(['./**/*.php', '!./runtime/**/*.php', './**/*.css', './**/*.js'], taskReload);
  return done();
}

gulp.task('default', taskDefault);
gulp.task('watch', taskWatch)
