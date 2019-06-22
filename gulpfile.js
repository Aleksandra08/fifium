'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    del = require('del'),
    webserver = require('gulp-webserver'),
babel = require('gulp-babel');


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('start', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

function clean() {
    return del(['build']);
}

function styles() {
    return gulp.src(path.src.style)
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
}

function html() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
}

function js() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(path.build.js));
}

function img() {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
}

function watch() {
    return gulp.watch(path.styles.src, styles, html, js, img);
}

var build = gulp.series(clean, gulp.parallel(styles, html, js, img));

exports.watch = watch;
exports.build = build;
exports.js = js;
exports.styles = styles;


exports.default = build;


// gulp.task('fonts:build', function() {
//     gulp.src(path.src.fonts)
//         .pipe(gulp.dest(path.build.fonts))
// });

