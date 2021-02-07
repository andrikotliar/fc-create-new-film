const gulp = require('gulp');
const babel = require('gulp-babel');
const terser = require ('gulp-terser');
const postcss = require('gulp-postcss');
const sync = require('browser-sync');

const html = () => {
    return gulp.src('*.html')
        .pipe(sync.stream());
};

exports.html = html;

const styles = () => {
    return gulp.src('src/styles/styles.css')
        .pipe(postcss([
            require('postcss-import'),
            require('autoprefixer'),
            require('postcss-csso'),
        ]))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

exports.styles = styles;

const scripts = () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

exports.scripts = scripts;

const copy = () => {
    return gulp.src([
            'src/images/**/*',
            'src/libraries/**/*'
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

exports.copy = copy;

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
    gulp.watch('src/styles/**/*.css', gulp.series(styles));
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
    gulp.watch([
        'src/images/**/*',
        'src/libraries/**/*'
    ], 
    gulp.series(copy));
};

exports.watch = watch;

exports.default = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy
    ),

    gulp.parallel(
        watch,
        server,
    ),
);