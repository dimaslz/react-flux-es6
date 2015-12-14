var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var _ = require('lodash');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var chalk = require('chalk'); // Allows for coloring for logging
var notifier = require('node-notifier');
var transform = require('vinyl-transform');
var duration = require('gulp-duration');
var notify = require('gulp-notify');
var merge = require('utils-merge');
var buffer = require('vinyl-buffer'); // Vinyl stream support
var sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
var gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
});

var config = {
  js: {
    src: './src/app/main.js',
    watch: './src/**/*',
    outputDir: './dist/',
    outputFile: './dist/js/main.js'
  }
};

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}


function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError) // Map error reporting
    .pipe(source('main.js')) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest('./dist/js')) // Set the output folder
    //.pipe(notify({
    //  message: 'Generated file: <%= file.relative %>',
    //})) // Output the file being created
    .pipe(bundleTimer)
    .pipe(browserSync.reload({
      stream: true
    })); // Reload the view in the browser
}

gulp.task('copy', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
  // gulp.src('src/assets/**/*.*')
  //   .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', ['copy', 'browser-sync'], function() {
  var args = merge(watchify.args, { debug: true }); // Merge in default watchify args with browserify arguments
  gulp.watch('src/**/*.html', ['copy']);

  var bundler = browserify(config.js.src, args) // Browserify
    .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
    .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

  bundler.on('update', function() {
    bundle(bundler); // Re-run bundle on source updates
  });
});


































//
//// Regular
//gulp.task('browserify', function () {
//  browserify('./src/app/main.js')
//    .transform("babelify", {presets: ["es2015", "react"]})
//    .bundle()
//    .pipe(source('main.js'))
//    .pipe(gulp.dest('dist/js'))
//    .pipe(browserSync.stream());
//});
//
//gulp.task('copy', function () {
//  gulp.src('src/index.html')
//    .pipe(gulp.dest('dist'));
//  // gulp.src('src/assets/**/*.*')
//  //   .pipe(gulp.dest('dist/assets'));
//});
//gulp.task('default', ['browserify', 'copy', 'browser-sync'], function () {
//  return gulp.watch('src/**/*.*', ['browserify', 'copy'])
//});
