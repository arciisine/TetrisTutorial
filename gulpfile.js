const gulp = require('gulp');
const ts = require('gulp-typescript');
const watch = require('gulp-watch');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const tsProject = ts.createProject('./tsconfig.json');
const connect = require('gulp-connect');
/*
compile typescript
use ES5 and commonJS module
*/
gulp.task('typescript', function () {
  /* 
   old version
   const tsResult = tsProject.src().pipe(ts(tsProject));
   changed for
  */
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist/app'));
});
/*
Web server to test app
*/
gulp.task('webserver', function () {
  connect.server({
    livereload: true,
    root: ['.', 'dist']
  });
});
/*
Automatic Live Reload
*/
gulp.task('livereload', function () {
  gulp.src(['dist/style/*.css', 'dist/app/*.js'])
    .pipe(watch(['dist/style/*.css', 'dist/app/*.js']))
    .pipe(connect.reload());
});
/*
copy all html files and assets
*/
gulp.task('copy', function () {
  gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
  gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist/assets'));
});

gulp.task('sass', function () {
  gulp.src('src/style/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('watch', function () {
  gulp.watch('src/style/**/*.scss', ['sass']);
  gulp.watch('src/app/**/*.ts', ['typescript']);
  gulp.watch(['src/**/*.html', 'src/assets/**'], ['copy']);

})
/*
default task
*/
gulp.task('default', ['sass', 'typescript', 'copy', 'webserver', 'livereload', 'watch']);