var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	beautify = require('gulp-jsbeautify'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del');

gulp.task('libs-css', function() {
	return gulp.src('app/css/libs/*.css')
		.pipe(concat('libs.css'))
		.pipe(autoprefixer(['last 3 versions'], { cascade: true }))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
});

gulp.task('stylus', function() {
	return gulp.src('app/stylus/*.styl')
		.pipe(stylus({
			'include css': true
		}))
		.pipe(autoprefixer(['last 3 versions'], { cascade: true }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('pug', function() {
	return gulp.src('app/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('libs-js', function() {
	return gulp.src('app/js/libs/*.js')
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
	return gulp.src('app/img/*')
		.pipe(cache(imagemin({
			interlased: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('pic', function() {
	return gulp.src('app/pic/*')
		.pipe(cache(imagemin({
			interlased: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/pic'))
});

gulp.task('graphic', ['img', 'pic']);

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'stylus', 'pug', 'scripts'], function() {
	gulp.watch('app/stylus/*.styl', ['stylus']);
	gulp.watch('app/*.pug', ['pug']);
	gulp.watch('app/js/*.js', ['scripts']);
});

gulp.task('fonts', function() {
	gulp.src('app/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['watch']);


gulp.task('build', ['clean', 'libs-css', 'stylus', 'libs-js', 'scripts', 'pug', 'graphic'], function() {
	
	var buildFonts = gulp.src('app/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
		
});