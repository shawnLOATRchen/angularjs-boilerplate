'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var angularTemplatecache = require('gulp-angular-templatecache');
var browserify = require('browserify')
var babelify = require('babelify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');


gulp.task('browser-sync', function () {
  browserSync.init(null, {
    open: false,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('browserify', function(){
  var sources = browserify({
		entries: './src/index.js',
		debug: true // Build source maps
	})
	.transform(babelify.configure({ presets: ["es2015"] }));

  return sources.bundle()
    .pipe(vinylSourceStream('es6.js'))
    .pipe(vinylBuffer())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('html', function partials() {
  return gulp.src(['./src/templates/*.html', './src/components/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(angularTemplatecache('templateCacheHtml.js', {
      module: 'my-app',
      root: 'templates'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src("./src/styles/index.sass")
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('script', function () {
  return gulp.src([
      "./src/index.js",
      "./src/scripts/**/*.js",
      "./src/components/**/*.js"
    ])
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('rootFile', function () {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('assets', function () {
  return gulp.src("./src/assets/**/*.*")
    .pipe(gulp.dest('./dist/assets'))
});

gulp.task('build', ['sass', 'html', 'script', 'assets', 'rootFile']);

gulp.task('serve', function () {
  // devMode = true;
  gulp.start(['build', 'browser-sync']);
  gulp.watch(['./src/**/*.sass'], ['sass']);
  gulp.watch(['./src/**/*.js'], ['script']);
  gulp.watch(['./src/**/*.html'], ['html']);
  gulp.watch(['./index.html'], ['rootFile']);
});
