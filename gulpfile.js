const gulp = require('gulp');
const sync = require('browser-sync');

const html = () => {
    return gulp.src('*.html')
        .pipe(sync.stream());
};

exports.html = html;

const styles = () => {
    return gulp.src('styles/**/*.css')
        .pipe(sync.stream());
};

exports.styles = styles;

const scripts = () => {
    return gulp.src('scripts/**/*.js')
        .pipe(sync.stream());
};

exports.scripts = scripts;

const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: './'
        }
    });
};

exports.server = server;

const watch = () => {
    gulp.watch('*.html', gulp.series(html));
    gulp.watch('styles/**/*.css', gulp.series(styles));
    gulp.watch('scripts/**/*.js', gulp.series(scripts));
};

exports.watch = watch;

exports.default = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts
    ),

    gulp.parallel(
        watch,
        server,
    ),
);