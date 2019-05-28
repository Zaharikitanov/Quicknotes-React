//Install these packages first.
//npm i gulp gulp-sass @babel/core gulp-babel gulp-uglify gulp-minify-css del perfect-scrollbar
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var del = require('del');

var paths = {
    styles: {
        srcFrontend: 'Styles/**/*.scss',
        dest: 'ClientApp/src/styles'
    }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
    // You can use multiple globbing patterns as you would with `gulp.src`,
    // for example if you are using del 2.0 or above, return its promise
    return del(['assets']);
}

/*
 * Define our tasks using plain functions
 */

function styles() {
    return gulp.src(paths.styles.srcFrontend)
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
    gulp.watch(paths.styles.srcFrontend, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;