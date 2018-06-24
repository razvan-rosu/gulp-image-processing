const gulp = require('gulp');

const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');

const smushit = require('gulp-smushit');

const webp = require('gulp-webp');

/* --------------------------------------
                   Flow:
                   ____
#1 Optimize JPGs
#2 Optimize PNGs
#3 Convert JPGs and PNGs to WebP


 -------------------------------------- */

/* --------------------------------------
                    #1
 -------------------------------------- */
// Optimize JPGs
gulp.task('optimize_jpg', function() {
    return gulp.src('development/**/*.jpg')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('production/'));
});


/* --------------------------------------
                    #2
 -------------------------------------- */
// Optimize PNGs
gulp.task('optimize_png', function() {
    return gulp.src('development/**/*.png')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('production/'));
});

// gulp.task('optimize_png', function() {
//     return gulp.src('development/**/*.png')
//         .pipe(imagemin({
//             verbose: true,
//             optimizationLevel: 7,
//             progressive: true,
//             interlaced: true,
//             use: [imageminPngQuant({speed: 1})]
//         }))
//         .pipe(gulp.dest('production/images/'));
// });git 


/* --------------------------------------
                    #3
 -------------------------------------- */
// Convert JPGs and PNGs to WebP
gulp.task('conversion_webp', function() {
    return gulp.src('development/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(gulp.dest('production/'));
});


/* --------------------------------------
                Default task
 -------------------------------------- */
gulp.task('default', [
    'optimize_jpg',
    'optimize_png',
    'conversion_webp'
]);