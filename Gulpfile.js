var gulp = require('gulp'),
refresh = require('gulp-refresh'),
stylus = require('gulp-stylus'),
include = require('gulp-include'),
prefixer = require('gulp-autoprefixer'),
coffee = require('gulp-coffee'),
header = require('gulp-header'),

/* CONFIG
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

conf = {

  stylus: {
    opt: { compress: false },
    matchAll: '/**/*.styl',
    matchRoot: '/*.styl',
    // task default
    src: './src/stylus',
    dest: './public_html/css',
    // task cms
    srcBackend: './backend/src/stylus',
    srcFronted: './fronted/src/stylus',
    destBackend: './public_html/admin-panel/css',
    destFronted: './public_html/css'
  },

  coffee: {
    opt: { bare: true },
    matchAll: '/**/*.coffee',
    matchRoot: '/*.coffee',
    // task default
    src: './src/coffee',
    dest: './public_html/js',
    // task cms
    srcBackend: './backend/src/coffee',
    srcFronted: './fronted/src/coffee',
    destBackend: './public_html/admin-panel/js',
    destFronted: './public_html/js'
  },

  html: {
    matchAll: '/**/*.html',
    matchRoot: '/*.html',
    // task default
    src: './src/html',
    dest: './public_html',
    // task cms
    srcBackend: './backend/src/html',
    srcFronted: './fronted/src/html',
    destBackend: './public_html/admin-panel/html',
    destFronted: './public_html/html'
  },

  include: {
    opt: { hardFail:false }
  },

  prefixer: {
    opt: { browsers:['last 2 versions'], cascade:true }
  },

  header: {
    opt: '/*\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n\n'
  },
};

/* * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

watch = {
  // default
  stylus: conf.stylus.src + conf.stylus.matchAll,
  coffee: conf.coffee.src + conf.coffee.matchAll,
  html: conf.html.src + conf.html.matchAll,
  // task cms
  stylusBackend: conf.stylus.srcBackend + conf.stylus.matchAll,
  stylusFronted: conf.stylus.srcFronted + conf.stylus.matchAll,
  coffeeBackend: conf.coffee.srcBackend + conf.coffee.matchAll,
  coffeeFronted: conf.coffee.srcFronted + conf.coffee.matchAll,
  htmlBackend: conf.html.srcBackend + conf.html.matchAll,
  htmlFronted: conf.html.srcFronted + conf.html.matchAll,
},

// src = {
//   // task default
//   stylus: path.src+'/stylus/*.styl',
//   coffee: path.src+'/coffee/*.coffee',
//   html: path.src+'/html/*.html'
//   // task cms
//   stylus: path.src+'/stylus/*.styl',
//   coffee: path.src+'/coffee/*.coffee',
// },

// dest = {
//   stylus: path.public+'/css',
//   coffee: path.public+'/js',
//   html: path.public
// };

// Functions

function error(err, done) {
  console.log(err.message);
  return done();
}

function refreshPage(done) {
  refresh.reload();
  return done();
}

function compileCoffee(arg={done, src, dest}) {
  return gulp.src(arg.src+conf.coffee.matchRoot)
    .on('end', function() { return arg.done(); })
    .on('error', function (err) { return error(err, arg.done); })
    .pipe(include(conf.include.opt).on('error', function(err) { return error(err, arg.done); }))
    .pipe(coffee(conf.coffee.opt).on('error', function(err) { return error(err, arg.done); }))
    .pipe(header(conf.header.opt))
    .pipe(gulp.dest(arg.dest))
    .pipe(refresh());
}

function compileStylus(a={done, src, dest}) {
  return gulp.src(a.src+conf.stylus.matchRoot)
    .on('end', function() { return a.done(); })
    .on('error', function (err) { return error(err, a.done); })
    .pipe(stylus(conf.stylus.opt).on('error', function(err) { return error(err, a.done); }))
    .pipe(prefixer(conf.prefixer.opt).on('error', function(err) { return error(err, a.done); }))
    .pipe(header(conf.header.opt))
    .pipe(gulp.dest(a.dest))
    .pipe(refresh());
}

function includeHtml(a={done, src, dest}) {
  return gulp.src(a.src+conf.html.matchRoot)
    .on('end', function() { refresh.reload(); return a.done(); })
    .on('error', function (err) { return error(err, a.done); })
    .pipe(include(conf.include.opt).on('error', function(err) { return error(err, a.done); }))
    .pipe(gulp.dest(a.dest));
}

// Tasks Call Back

function taskDefault(done) {
  refresh.listen({basePath: conf.html.dest});
  gulp.watch(watch.stylus, function stylusDefault(stylusDone) {
    return compileStylus({done:stylusDone, src:conf.stylus.src, dest:conf.stylus.dest});
  });
  gulp.watch(watch.coffee, function coffeeDefault(coffeeDone) {
    return compileCoffee({done:coffeeDone, src:conf.coffee.src, dest:conf.coffee.dest});
  });
  gulp.watch(watch.html, function htmlDefault(htmlDone) {
    return includeHtml({done:htmlDone, src:conf.html.src, dest:conf.html.dest});
  });
  return done();
}

function taskCms(done) {
  refresh.listen({basePath: conf.html.dest});
  gulp.watch(watch.stylusBackend, function stylusBackend(stylusBackendDone) {
    return compileStylus({done:stylusBackendDone, src:conf.stylus.srcBackend, dest:conf.stylus.destBackend});
  });
  gulp.watch(watch.stylusFronted, function stylusFronted(stylusFrontedDone) {
    return compileStylus({done:stylusFrontedDone, src:conf.stylus.srcFronted, dest:conf.stylus.destFronted});
  });
  gulp.watch(watch.coffeeBackend, function coffeeBackend(coffeeBackendDone) {
    return compileCoffee({done:coffeeBackendDone, src:conf.coffee.srcBackend, dest:conf.coffee.destBackend});
  });
  gulp.watch(watch.coffeeFronted, function coffeeFronted(coffeeFrontedDone) {
    return compileCoffee({done:coffeeFrontedDone, src:conf.coffee.srcFronted, dest:conf.coffee.destFronted});
  });
  gulp.watch(watch.htmlBackend, function htmlBackend(htmlBackendDone) {
    return includeHtml({done:htmlBackendDone, src:conf.html.srcBackend, dest:conf.html.destBackend});
  });
  gulp.watch(watch.htmlFronted, function htmlFronted(htmlFrontedDone) {
    return includeHtml({done:htmlFrontedDone, src:conf.html.srcFronted, dest:conf.html.destFronted});
  });
  gulp.watch(['./**/*.php', '!./runtime/**/*.php', '!./vendor/**/*.php'], refreshPage);
  return done();
}

function taskWatch(done) {
  refresh.listen({basePath: conf.html.dest});
  gulp.watch(['./**/*.php', '!./runtime/**/*.php', '!./vendor/**/*.php', './**/*.css', './**/*.js'], refreshPage);
  return done();
}

// Tasks

gulp.task('default', taskDefault);
gulp.task('watch', taskWatch);
gulp.task('cms', taskCms);
