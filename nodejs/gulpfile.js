'use strict'

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

gulp.task('jsLint', function () {
	return gulp.src('./*.js') 
	.pipe(jshint())
	.pipe(jshint.reporter());
});

gulp.task('develop', function () {
  var stream = nodemon({ script: 'index.js'
          , ext: 'html js'
          , tasks: ['jsLint'] })
 
  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
});


gulp.task('default', ['develop']);
