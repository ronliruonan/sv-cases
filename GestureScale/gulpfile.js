const gulp = require('gulp');
const browser = require('browser-sync').create();

gulp.task('serve', function () {
    browser.init({
        files: ['**'],
        server: {
            baseDir: './docs',
            index: 'pages/index.html'
        },
        port: 6203
    });
});