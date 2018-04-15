// ****************************************************************************
// Gulp dependencies
// ****************************************************************************
var gulp = require("gulp");
var browserSync = require('browser-sync').create();

// ****************************************************************************
// Application resources
// ****************************************************************************

gulp.task('browserSync', function() {
    browserSync.init({
            server: {baseDir: './'},
            notify:false
        });
});
    
gulp.task('watch', ['browserSync'], function (){
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./css/*.css', browserSync.reload);	
    gulp.watch('./js/*.js', browserSync.reload);
});

gulp.task("default", ['watch'], function () {});