/* CONFIG
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const conf = {
  opt: {
    header: '/*\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n\n',
    stylus: { compress: true },
    prefixer: { browsers:['last 2 versions'], cascade:false },
    coffee: { bare: false, transpile: {presets: ["@babel/preset-env"]} },
    livereload: { basePath: './public_html/' },
    include: { hardFail:false }
  },

  default: {
    stylusWatch: './src/stylus/**/*.styl',
    stylusSrc: './src/stylus/*.styl',
    stylusDest: './public_html/css',
    vendorCss: './src/vendor.css',

    coffeeWatch: './src/coffee/**/*.coffee',
    coffeeSrc: './src/coffee/*.coffee',
    coffeeDest: './public_html/js',
    vendorJs: './src/vendor.js',

    htmlWatch: './src/html/**/*.html',
    htmlSrc: './src/html/*.html',
    htmlDest: './public_html'
  },

  backend: {
    stylusWatch: './src/backend/stylus/**/*.styl',
    stylusSrc: './src/backend/stylus/*.styl',
    stylusDest: './public_html/admin-panel/css',
    vendorCss: './src/backend/vendor.css',

    coffeeWatch: './src/backend/coffee/**/*.coffee',
    coffeeSrc: './src/backend/coffee/*.coffee',
    coffeeDest: './public_html/admin-panel/js',
    vendorJs: './src/backend/vendor.js',
  },
  
  fronted: {
    stylusWatch: './src/fronted/stylus/**/*.styl',
    stylusSrc: './src/fronted/stylus/*.styl',
    stylusDest: './public_html/css',
    vendorCss: './src/fronted/vendor.css',

    coffeeWatch: './src/fronted/coffee/**/*.coffee',
    coffeeSrc: './src/fronted/coffee/*.coffee',
    coffeeDest: './public_html/js',
    vendorJs: './src/fronted/vendor.js'
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

const fs = require('fs');
const livereload = require('gulp-livereload');
const stylus = require('gulp-stylus');
const include = require('gulp-include');
const prefixer = require('gulp-autoprefixer');
const coffee = require('gulp-coffee');
const uglify = require('gulp-uglify');
const header = require('gulp-header');

/* FUNCTIONS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function error(err, done) {
  console.log(err.message);
  return done();
}

function compileCoffee(config, done) {
  return src(config.coffeeSrc)
    .on('end', function() { return done(); })
    .on('error', function (err) { return error(err, done); })
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done); }))
    .pipe(coffee(conf.opt.coffee).on('error', function(err) { return error(err, done); }))
    .pipe(uglify().on('error', function(err) { return error(err, done); }))
    .pipe(header(conf.opt.header))
    .pipe(header(fs.readFileSync(config.vendorJs)))
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done); }))
    .pipe(dest(config.coffeeDest))
    .pipe(livereload());
}

function compileStylus(config, done) {
  return src(config.stylusSrc)
    .on('end', function() { return done(); })
    .on('error', function (err) { return error(err, done); })
    .pipe(stylus(conf.opt.stylus).on('error', function(err) { return error(err, done); }))
    .pipe(prefixer(conf.opt.prefixer).on('error', function(err) { return error(err, done); }))
    .pipe(header(conf.opt.header))
    .pipe(header(fs.readFileSync(config.vendorCss)))
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done); }))
    .pipe(dest(config.stylusDest))
    .pipe(livereload());
}

function includeHtml(config, done) {
  return src(config.htmlSrc)
    .on('end', function() { return done(); })
    .on('error', function (err) { return error(err, done); })
    .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done); }))
    .pipe(dest(config.htmlDest))
    .pipe(livereload());
}

function reloadPage(path) { livereload.reload(path); }

/* TASKS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function defaultStylus(done) { compileStylus(conf.default, done); }
function defaultCoffee(done) { compileCoffee(conf.default, done); }
function defaultHtml(done) { includeHtml(conf.default, done); }

function frontedStylus(done) { compileStylus(conf.fronted, done); }
function frontedCoffee(done) { compileCoffee(conf.fronted, done); }

function backendStylus(done) { compileStylus(conf.backend, done); }
function backendCoffee(done) { compileCoffee(conf.backend, done); }

exports.default = function() {
  livereload.listen(conf.opt.livereload);
  watch(conf.default.stylusWatch, defaultStylus);
  watch(conf.default.coffeeWatch, defaultCoffee);
  watch(conf.default.htmlWatch, defaultHtml);
};

exports.cms = function() {
  livereload.listen(conf.opt.livereload);
  watch(conf.fronted.stylusWatch, frontedStylus);
  watch(conf.fronted.coffeeWatch, frontedCoffee);
  watch(conf.backend.stylusWatch, backendStylus);
  watch(conf.backend.coffeeWatch, backendCoffee);
};

watcher.on('add', reloadPage).on('change', reloadPage).on('unlink', reloadPage);
