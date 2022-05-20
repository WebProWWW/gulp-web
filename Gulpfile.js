
const {
    src,
    dest,
    watch,
    series
}                               = require('gulp')
const {
    VueLoaderPlugin
}                               = require('vue-loader')
const stylus                    = require('gulp-stylus')
const postcss                   = require('gulp-postcss')
const coffee                    = require('gulp-coffee')
const include                   = require('gulp-include')
const livereload                = require('gulp-livereload')
const header                    = require('gulp-header')
const autoprefixer              = require('autoprefixer')
const cssnano                   = require('cssnano')
const webpack                   = require('webpack')
const webpackStream             = require('webpack-stream')
const argv                      = require('yargs').argv
const named                     = require('vinyl-named')


const copy = '/*!\n * @author Timur Valiyev\n * @link https://webprowww.github.io\n */\n'


let DEV_MODE = false;

function error (err, done) {
    if (err != null) {
        console.log(err.message)
    }
    return done()
}


function compileVue(done) {
    return src(['./src/vue/*.coffee'])
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(named())
        .pipe(webpackStream({
            mode: DEV_MODE ? 'development' : 'production',
            module: {
                rules: [
                    {
                        test: /\.stylus$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [ 'autoprefixer', 'cssnano' ],
                                    },
                                },
                            },
                            {
                                loader: 'stylus-loader',
                                options: {
                                    stylusOptions: {
                                        compress: false,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        test: /\.coffee$/,
                        loader: 'coffee-loader',
                        options: {
                            bare: false,
                            transpile: {
                                presets: [ '@babel/preset-env' ]
                            },
                        },
                    },
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader',
                    },
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader',
                        options: {
                            presets: [ '@babel/preset-env' ],
                        },
                    },
                ],
            },
            plugins: [
                new VueLoaderPlugin(),
            ],
            output: {
                filename: '[name].js',
            },
        }, webpack).on('error', function(err) { return error(err, done) }))
        .pipe(dest('./public_html/vue'))
        .on('end', function () { reloadPage(done) })
}


function compileCoffee(done) {
    return src('./src/coffee/*.coffee')
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include({
            hardFail: false,
            includePaths: __dirname + '/src/coffee/inc',
        }).on('error', function(err) { return error(err, done) }))
        .pipe(coffee({
            bare: false,
            transpile: {
                presets: [ '@babel/preset-env' ],
            },
        }).on('error', function(err) { return error(err, done) }))
        .pipe(header(copy))
        .pipe(dest('./public_html/js'))
        .on('end', function () { reloadPage(done) })
}


function compileStylus(done) {
    return src('./src/stylus/*.styl')
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(stylus({
            compress: false,
        }).on('error', function(err) { return error(err, done) }))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]).on('error', function(err) { return error(err, done) }))
        .pipe(header(copy))
        .pipe(dest('./public_html/css'))
        .on('end', function () { reloadPage(done) })
}


function dependsJs(done) {
    return src('./src/depends/*.js')
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include({
            hardFail: false,
            includePaths: __dirname + '/src/depends/vendor',
        }).on('error', function(err) { return error(err, done) }))
        .pipe(dest('./public_html/js'))
        .on('end', function () { reloadPage(done) })
}


function dependsCss(done) {
    return src('./src/depends/*.css')
        .on('end', function() { return done() })
        .on('error', function (err) { return error(err, done) })
        .pipe(include({
            hardFail: false,
            includePaths: __dirname + '/src/depends/vendor',
        }).on('error', function(err) { return error(err, done) }))
        .pipe(dest('./public_html/css'))
        .on('end', function () { reloadPage(done) })
}


function reloadPage(done) {
    livereload.reload()
    return done()
}


exports.default = function(done) {
    if (argv.dev === true) {
        DEV_MODE = true;
        livereload.listen()
        watch([
            './src/vue/**/*.vue',
            './src/vue/**/*.coffee'
        ], compileVue)
        watch('./src/coffee/**/*.coffee', compileCoffee)
        watch('./src/stylus/**/*.styl', compileStylus)
        watch('./src/depends/**/*.js', dependsJs)
        watch('./src/depends/**/*.css', dependsCss)
        watch([
            './**/*.php',
            './public_html/**/*.html',
            './public_html/**/*.svg',
            '!./node_modules/**',
            '!./runtime/**',
            '!./vendor/**',
        ], reloadPage)
        return done()
    }
    return series(compileVue, compileCoffee, compileStylus, dependsJs, dependsCss)(done)
}

