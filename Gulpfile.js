/* PLUGINS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { src, dest, watch } = require('gulp')
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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const conf = {
    // OPTIONS
    opt: {
        header: '/*!\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n',
        stylus: { compress: false },
        postcss: [ autoprefixer(), cssnano() ],
        coffee: { bare: false, transpile: { presets: ["@babel/preset-env"] } },
        includeCoffee: { hardFail: false, includePaths: __dirname + '/src/coffee' },
        includeStylus: { hardFail: false, includePaths: __dirname + '/src/stylus' },
        includeDepends: { hardFail: false, includePaths: __dirname + '/src/depends' },
    },
    // CSS
    stylusWatch: './src/stylus/**/*.styl',
    stylusSrc: './src/stylus/*.styl',
    stylusDest: './public_html/css',
    // JS
    coffeeWatch: './src/coffee/**/*.coffee',
    coffeeSrc: './src/coffee/*.coffee',
    coffeeDest: './public_html/js',
    // JS DEPENDS
    dependsJsWatch: './src/depends/**/*.js',
    dependsJsSrc: './src/depends/*.js',
    dependsJsDest: './public_html/js',
    // CSS DEPENDS
    dependsCssWatch: './src/depends/**/*.css',
    dependsCssSrc: './src/depends/*.css',
    dependsCssDest: './public_html/css',
    // HTML
    htmlWatch: './src/html/**/*.html',
    htmlSrc: './src/html/*.html',
    htmlDest: './public_html',
    // WATCH
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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function error (err, done) {
    console.log(err.message)
    return done()
}

function compileCoffee(done) {
    return src(conf.coffeeSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include(conf.opt.includeCoffee).on('error', function(err) { return error(err, done) }))
        .pipe(coffee(conf.opt.coffee).on('error', function(err) { return error(err, done) }))
        .pipe(uglify().on('error', function(err) { return error(err, done) }))
        .pipe(header(conf.opt.header))
        .pipe(dest(conf.coffeeDest))
        .pipe(livereload())
}

function compileStylus(done) {
    return src(conf.stylusSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(stylus(conf.opt.stylus).on('error', function(err) { return error(err, done) }))
        .pipe(postcss(conf.opt.postcss).on('error', function(err) { return error(err, done) }))
        .pipe(include(conf.opt.includeStylus).on('error', function(err) { return error(err, done) }))
        .pipe(header(conf.opt.header))
        .pipe(dest(conf.stylusDest))
        .pipe(livereload())
}

function dependsJs(done) {
    return src(conf.dependsJsSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include(conf.opt.includeDepends).on('error', function(err) { return error(err, done) }))
        .pipe(dest(conf.dependsJsDest))
        .pipe(livereload())

}

function dependsCss(done) {
    return src(conf.dependsCssSrc)
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include(conf.opt.includeDepends).on('error', function(err) { return error(err, done) }))
        .pipe(dest(conf.dependsCssDest))
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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


 exports.default = function() {
    livereload.listen()
    watch(conf.stylusWatch, compileStylus)
    watch(conf.coffeeWatch, compileCoffee)
    watch(conf.htmlWatch, includeHtml)
    watch(conf.dependsJsWatch, dependsJs)
    watch(conf.dependsCssWatch, dependsCss)
    watch(conf.watcher, reloadPage)
}

