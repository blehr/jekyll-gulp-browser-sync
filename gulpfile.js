var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var cssnano      = require('gulp-cssnano');
var sass         = require('gulp-sass');
var size         = require('gulp-size');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');
var child        = require('child_process');
var runSequence  = require('run-sequence');
var browserSync  = require('browser-sync');
var rename       = require('gulp-rename');


/// Uses Sass compiler to process styles, adds vendor prefixes, minifies,
// and then outputs file to appropriate location(s)
gulp.task('styles', function() {
  return gulp.src('_app/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 10']}))
    .pipe(cssnano())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .on('error', gutil.log);
});


// Concatenates and uglifies JS files and outputs result to
// the appropriate location(s).
gulp.task('scripts', function() {
  return gulp.src('_app/scripts/**/*.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}))
    .on('error', gutil.log);
});


// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('images', function() {
  return gulp.src('_app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('images'))
    .pipe(gulp.dest('_site/images'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});

// build jekyll
gulp.task('build', (done) => {
  return child.spawn('jekyll', ['build'], { stdio: 'inherit'})
    .on('close', done);
});

// build and reloads browser
gulp.task('rebuild', ['build'], function () {
  browserSync.reload();
});

// refresh the browser
gulp.task('reload', function() {
    browserSync.reload();
});


// Only deletes what's in the site folder
gulp.task('clean:jekyll', function(cb) {
  del(['_site'], cb);
});



// clean stuff
gulp.task('clean:styles', function() {
  return del.sync('css');
});

gulp.task('clean:scripts', function() {
  return del.sync('js');
});

gulp.task('clean:images', function() {
  return del.sync('images');
});




// build pieces
gulp.task('build:styles', function(cb) {
    runSequence('clean:styles', 'styles',  cb);
});

gulp.task('build:scripts', function(cb) {
    runSequence('clean:scripts', 'scripts', 'reload', cb);
});

gulp.task('build:images', function(cb) {
    runSequence('clean:images', 'images', 'reload', cb);
});



gulp.task('browser-sync', function() {

  browserSync.init({
  server: {
            baseDir: "_site"
        },
  ui: {
      port: 8081
    },
  port: 8082
  
  });
});



gulp.task('watch', function(){
  gulp.watch('_app/styles/**/*.scss', ['build:styles']); 
  gulp.watch('_app/scripts/**/*.js', ['build:scripts']); 
  gulp.watch('_app/images/**/*.+(png|jpg|gif|svg)', ['build:images']);
  gulp.watch(['*.html', '_posts/*',  '_drafts/*', '*/*.html', '!_sites/**/*.html' ], ['rebuild']); 
});
 

// default
gulp.task('default', function (cb) {
  runSequence(['build:scripts', 'build:images', 'build:styles'], 'build', 'browser-sync', 'watch', cb);
});


// output production build
gulp.task('production', function(cb) {
    runSequence(['build:scripts', 'build:images', 'build:styles'], 'build', cb);
});
