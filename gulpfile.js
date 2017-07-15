const gulp = require('gulp');
const ts = require('gulp-typescript');
const watch = require('gulp-watch');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const del = require('del');

const tsProject = ts.createProject('./tsconfig.json');

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('typescript', function () {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist/app'));
});

gulp.task('copy-systemjs', function () {
  gulp.src(['node_modules/systemjs/**/*'])
    .pipe(gulp.dest('dist/external/systemjs'));
});

gulp.task('webserver', function () {
  connect.server({
    livereload: true,
    root: ['.', 'dist']
  });
});

gulp.task('livereload', function () {
  watch(['dist/style/**/*.css', 'dist/app/**/*.js', 'dist/**/*.html', 'dist/asset/**/*'])
    .pipe(connect.reload());
});

gulp.task('copy', function () {
  gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
  gulp.src('src/asset/**/*').pipe(gulp.dest('dist/asset'));
});

gulp.task('sass', function () {
  gulp.src('src/style/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/style'));
});

gulp.task('watch', function () {
  gulp.watch('src/style/**/*.scss', ['sass']);
  gulp.watch('src/app/**/*.ts', ['typescript']);
  gulp.watch(['src/**/*.html', 'src/asset/**'], ['copy']);

})

gulp.task('run', ['sass', 'typescript', 'copy-systemjs', 'copy', 'webserver', 'livereload', 'watch']);

gulp.task('default', ['clean'], function (cb) {
  gulp.start('run');
});
