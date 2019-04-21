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
      stylusWatch: './src/backend/stylus/**/*.styl',
      stylusSrc: './src/backend/stylus/*.styl',
      stylusDest: './public_html/admin-panel/css',

      coffeeWatch: './src/backend/coffee/**/*.coffee',
      coffeeSrc: './src/backend/coffee/*.coffee',
      coffeeDest: './public_html/admin-panel/js',
    },
    fronted: {
      stylusWatch: './src/fronted/stylus/**/*.styl',
      stylusSrc: './src/fronted/stylus/*.styl',
      stylusDest: './public_html/css',

      coffeeWatch: './src/fronted/coffee/**/*.coffee',
      coffeeSrc: './src/fronted/coffee/*.coffee',
      coffeeDest: './public_html/js',
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

function backendStylus(done) { compileStylus({ done:done, src:conf.cms.backend.stylusSrc, dest:conf.cms.backend.stylusDest }); }
function backendCoffee(done) { compileCoffee({ done:done, src:conf.cms.backend.coffeeSrc, dest:conf.cms.backend.coffeeDest }); }

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
  watch(conf.cms.backend.stylusWatch, backendStylus);
  watch(conf.cms.backend.coffeeWatch, backendCoffee);
};

watcher.on('add', reloadPage).on('change', reloadPage).on('unlink', reloadPage);
