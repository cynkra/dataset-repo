import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import makeWebpackConfig from './webpack/makeconfig';
import webpackBuild from './webpack/build';
import webpackDevServer from './webpack/devserver';
import yargs from 'yargs';

var args = yargs
  .alias('p', 'production')
  .argv;

gulp.task('env', () => {
  const env = args.production ? 'production' : 'development';
  process.env.NODE_ENV = env; // eslint-disable-line no-undef
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production
  ? 'build-webpack-production'
  : 'build-webpack-dev'
]);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile.js',
    'src/**/*.js',
    'webpack/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('server', ['env', 'build'], bg('node', 'src/server'));

gulp.task('default', ['server']);
