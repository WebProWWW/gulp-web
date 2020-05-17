/* PLUGINS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const { src, dest, watch } = require('gulp')
const fs = require('fs')
const include = require('gulp-include')
const header = require('gulp-header')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const coffee = require('gulp-coffee')
const uglify = require('gulp-uglify')
const livereload = require('gulp-livereload')


/* CONFIG
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

const conf = {
    opt: {
        header: '/*!\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n\n',
        stylus: { compress: false },
        postcss: [ autoprefixer(), cssnano() ],
        coffee: { bare: false, transpile: { presets: ["@babel/preset-env"] } },
        include: { hardFail: false },
        livereload: { basePath: './public_html' },
    },
    stylusWatch: [ './src/stylus/**/*.styl', './src/**/*.css' ],
    stylusSrc: './src/stylus/*.styl',
    stylusDest: './public_html/css',
    vendorCss: './src/include.css',
    coffeeWatch: [ './src/coffee/**/*.coffee', './src/**/*.js' ],
    coffeeSrc: './src/coffee/*.coffee',
    coffeeDest: './public_html/js',
    vendorJs: './src/include.js',
    htmlWatch: './src/html/**/*.html',
    htmlSrc: './src/html/*.html',
    htmlDest: './public_html',
    watcher: [
        './**/*.php',
        './public_html/**/*.svg',
        './public_html/**/*.png',
        './public_html/**/*.jpg',
        '!./node_modules/**',
        '!./runtime/**',
        '!./vendor/**',
    ]
}


/* FUNCTIONS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */

function error (err, done) {
    console.log(err.message)
    return done()
}

function compileCoffee(done) {
    return src(conf.coffeeSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done) }))
        .pipe(coffee(conf.opt.coffee).on('error', function(err) { return error(err, done) }))
        .pipe(uglify().on('error', function(err) { return error(err, done) }))
        .pipe(header(conf.opt.header))
        .pipe(header(fs.readFileSync(conf.vendorJs)))
        .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done) }))
        .pipe(dest(conf.coffeeDest))
        .pipe(livereload())
}

function compileStylus(done) {
    return src(conf.stylusSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(stylus(conf.opt.stylus).on('error', function(err) { return error(err, done) }))
        .pipe(postcss(conf.opt.postcss))
        .pipe(header(conf.opt.header))
        .pipe(header(fs.readFileSync(conf.vendorCss)))
        .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done) }))
        .pipe(dest(conf.stylusDest))
        .pipe(livereload())
}

function includeHtml(done) {
    return src(conf.htmlSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include(conf.opt.include).on('error', function(err) { return error(err, done) }))
        .pipe(dest(conf.htmlDest))
        .pipe(livereload())
}

function reloadPage(done) {
    livereload.reload()
    done()
}


/* TASKS
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * */


 exports.default = function() {
    livereload.listen()
    watch(conf.stylusWatch, compileStylus)
    watch(conf.coffeeWatch, compileCoffee)
    watch(conf.htmlWatch, includeHtml)
    watch(conf.watcher, reloadPage)
}

