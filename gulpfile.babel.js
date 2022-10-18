import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import makeWebpackConfig from './webpack/makeconfig';
import rename from 'gulp-rename';
import webpackBuild from './webpack/build';
import webpackDevServer from './webpack/devserver';
import yargs from 'yargs';

var series = gulp.series;

var args = yargs
  .alias('p', 'production')
  .argv;

gulp.task('env', (done) => {
  const env = args.production ? 'production' : 'development';
  process.env.NODE_ENV = env; // eslint-disable-line no-undef
  done();
});

gulp.task('local-config', (done) => {
  var configDir = './src/config/';
  var localConfigClient = 'config.client.local.js';
  var localConfigServer = 'config.server.local.js';
  var sampleConfig = 'config.sample.js';

  if (!fs.existsSync(configDir + localConfigClient)) {
    gulp.src(configDir + sampleConfig)
      .pipe(rename(localConfigClient))
      .pipe(gulp.dest(configDir));
  }

  if (!fs.existsSync(configDir + localConfigServer)) {
    gulp.src(configDir + sampleConfig)
      .pipe(rename(localConfigServer))
      .pipe(gulp.dest(configDir));
  }
  done();
});

gulp.task('build-webpack-production', series(webpackBuild(makeWebpackConfig(false))));
gulp.task('build-webpack-dev', series(webpackDevServer(makeWebpackConfig(true))));
gulp.task('build-webpack', series(args.production
  ? 'build-webpack-production'
  : 'build-webpack-dev'
));
gulp.task('build', series('local-config', 'build-webpack'));

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

gulp.task('server', series('env', 'build'), bg('node', 'src/server'));

gulp.task('default', series('server'));
