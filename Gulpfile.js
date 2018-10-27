/* CONFIG
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const conf = {
  opt: {
    header: '/*\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n\n',
    stylus: { compress: false },
    prefixer: { browsers:['last 2 versions'], cascade:true },
    coffee: { bare: false },
    livereload: { basePath: './public_html/' },
    include: { hardFail:false }
  },

  default: {
    stylusWatch: './src/stylus/**/*.styl',
    stylusSrc: './src/stylus/*.styl',
    stylusDest: './public_html/css',

    coffeeWatch: './src/coffee/**/*.coffee',
    coffeeSrc: './src/coffee/*.coffee',
    coffeeDest: './public_html/js',

    htmlWatch: './src/html/**/*.html',
    htmlSrc: './src/html/*.html',
    htmlDest: './public_html'
  },

  cms: {
    backend: {
      stylusWatch: './backend/src/stylus/**/*.styl',
      stylusSrc: './backend/src/stylus/*.styl',
      stylusDest: './public_html/admin-panel/css',

      coffeeWatch: './backend/src/coffee/**/*.coffee',
      coffeeSrc: './backend/src/coffee/*.coffee',
      coffeeDest: './public_html/admin-panel/js',

      htmlWatch: './backend/src/html/**/*.html',
      htmlSrc: './backend/src/html/*.html',
      htmlDest: './public_html/admin-panel/html'
    },
    fronted: {
      stylusWatch: './fronted/src/stylus/**/*.styl',
      stylusSrc: './fronted/src/stylus/*.styl',
      stylusDest: './public_html/css',

      coffeeWatch: './fronted/src/coffee/**/*.coffee',
      coffeeSrc: './fronted/src/coffee/*.coffee',
      coffeeDest: './public_html/js',

      htmlWatch: './fronted/src/html/**/*.html',
      htmlSrc: './fronted/src/html/*.html',
      htmlDest: './public_html/html'
    }
  },

  watcher: [
    './**/*.php',
    './public_html/**/*.svg',
    '!./runtime/**/*.php',
    '!./vendor/**/*.php'
  ]
};

/* PLUGINS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const { src, dest, watch } = require('gulp');
const watcher = watch(conf.watcher);

const livereload = require('gulp-livereload');
const stylus = require('gulp-stylus');
const include = require('gulp-include');
const prefixer = require('gulp-autoprefixer');
const coffee = require('gulp-coffee');
const header = require('gulp-header');

/* FUNCTIONS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function error(err, done) {
  console.log(err.message);
  return done();
}

function compileCoffee(a={done, src, dest}) {
  return src(a.src)
    .on('end', function() { return a.done(); })
    .on('error', function (err) { return error(err, a.done); })
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, a.done); }))
    .pipe(coffee(conf.opt.coffee).on('error', function(err) { return error(err, a.done); }))
    .pipe(header(conf.opt.header))
    .pipe(dest(a.dest))
    .pipe(livereload());
}

function compileStylus(a={done, src, dest}) {
  return src(a.src)
    .on('end', function() { return a.done(); })
    .on('error', function (err) { return error(err, a.done); })
    .pipe(stylus(conf.opt.stylus).on('error', function(err) { return error(err, a.done); }))
    .pipe(prefixer(conf.opt.prefixer).on('error', function(err) { return error(err, a.done); }))
    .pipe(header(conf.opt.header))
    .pipe(dest(a.dest))
    .pipe(livereload());
}

function includeHtml(a={done, src, dest}) {
  return src(a.src)
    .on('end', function() { return a.done(); })
    .on('error', function (err) { return error(err, a.done); })
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, a.done); }))
    .pipe(dest(a.dest))
    .pipe(livereload());
}

function reloadPage(path) { livereload.reload(path); }

/* TASKS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function defaultStylus(done) { compileStylus({ done:done, src:conf.default.stylusSrc, dest:conf.default.stylusDest }); }
function defaultCoffee(done) { compileCoffee({ done:done, src:conf.default.coffeeSrc, dest:conf.default.coffeeDest }); }
function defaultHtml(done) { includeHtml({ done:done, src:conf.default.htmlSrc, dest:conf.default.htmlDest }); }

function frontedStylus(done) { compileStylus({ done:done, src:conf.cms.fronted.stylusSrc, dest:conf.cms.fronted.stylusDest }); }
function frontedCoffee(done) { compileCoffee({ done:done, src:conf.cms.fronted.coffeeSrc, dest:conf.cms.fronted.coffeeDest }); }
function frontedHtml(done) { includeHtml({ done:done, src:conf.cms.fronted.htmlSrc, dest:conf.cms.fronted.htmlDest }); }

function backendStylus(done) { compileStylus({ done:done, src:conf.cms.backend.stylusSrc, dest:conf.cms.backend.stylusDest }); }
function backendCoffee(done) { compileCoffee({ done:done, src:conf.cms.backend.coffeeSrc, dest:conf.cms.backend.coffeeDest }); }
function backendHtml(done) { includeHtml({ done:done, src:conf.cms.backend.htmlSrc, dest:conf.cms.backend.htmlDest }); }

exports.default = function() {
  livereload.listen(conf.opt.livereload);
  watch(conf.default.stylusWatch, defaultStylus);
  watch(conf.default.coffeeWatch, defaultCoffee);
  watch(conf.default.htmlWatch, defaultHtml);
};

exports.cms = function() {
  livereload.listen(conf.opt.livereload);
  watch(conf.cms.fronted.stylusWatch, frontedStylus);
  watch(conf.cms.fronted.coffeeWatch, frontedCoffee);
  watch(conf.cms.fronted.htmlWatch, frontedHtml);
  watch(conf.cms.backend.stylusWatch, backendStylus);
  watch(conf.cms.backend.coffeeWatch, backendCoffee);
  watch(conf.cms.backend.htmlWatch, backendHtml);
};

watcher.on('add', reloadPage).on('change', reloadPage).on('unlink', reloadPage);