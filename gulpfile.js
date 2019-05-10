const gulp = require('gulp');
const del = require('del');
const server = require('browser-sync').create();
const less = require('gulp-less');

gulp.task('style', function() {
  return gulp.src('source/less/style.less')
  .pipe(less())
  .pipe(gulp.dest('build/css/'))
  .pipe(server.stream());
});

gulp.task('html', function() {
  return gulp.src('source/*.html')
  .pipe(gulp.dest('build/'));
})

gulp.task('clean', function() {
  return del(['build/*']);
})

gulp.task('serve', function() {
  server.init({
    server: './build'
  });

  gulp.watch('source/less/*.less', gulp.task('style'));
  gulp.watch('source/*.html', gulp.task('html'));
  gulp.watch('build/*.html').on('change', server.reload);
})

gulp.task('start', gulp.series(
  gulp.task('clean'),
  gulp.task('html'),
  gulp.task('style'),
  gulp.task('serve')
)); 