const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    config = {
        root: './src/',
        css: {
            watch: 'precss/**/*.less',
            src: 'precss/styles.less',
            dest: 'css'
        },
        html: '*.html'
    },
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    rename = require("gulp-rename"),
    less = require('gulp-less');


gulp.task('build', function (done) {
    gulp.src(config.root + config.css.src)

        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.root + config.css.dest))

        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});

gulp.task('watch:styles', function () {
    gulp.watch(config.root + config.css.watch, gulp.series('build')); //берет ./src/precss/**/*.css делает с ним 'build' + можно еще что-то после build добавить
});
gulp.task('watch:html', function () {
    gulp.watch(config.root + config.html).on('change', browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: config.root
        },
        // tunnel: true
    });
});

gulp.task('watch', gulp.series('build', gulp.parallel('watch:styles', 'watch:html', 'browser-sync')));