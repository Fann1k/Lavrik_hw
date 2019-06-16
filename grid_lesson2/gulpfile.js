const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    config = {
        root: './src/',
        css: {
            src: 'precss/**/*.css',
            dest: 'css'
        }
    },
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('build', function (done) {
    gulp.src(config.root + config.css.src) //берем все подпапки в папке precss и все файлы с разрешением .css

        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.root + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});

gulp.task('watch:styles', function () {
    gulp.watch(config.root + config.css.src, gulp.series('build')); //берет ./src/precss/**/*.css делает с ним 'build' + можно еще что-то после build добавить
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: config.root
        },
        // tunnel: true
    });
});

gulp.task('watch', gulp.series('build', gulp.parallel('watch:styles', 'browser-sync')));