const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      babel = require('gulp-babel'),
      sourcemaps = require('gulp-sourcemaps'),
      cssmin = require('gulp-cssmin');

// gulp任务，可以增加多个
// 压缩名字，回调函数
// gulp.task('js',()=>{
//     // 流操作，读取文件
//     return gulp.src(['./src/js/*.js'])
//         // 压缩
//         .pipe(uglify())
//         // 输出，文件夹不存在会自动创建
//         .pipe(gulp.dest('./bulid/js'));
// });

gulp.task('js',()=>{
    // 流操作，读取文件
    return gulp
        // 文件路径
        .src(['./src/js/**/*.js'])    
        // 启用sourcemap
        .pipe(sourcemaps.init())
        // 解析Es6，会产生调试问题(sourcemap解决)
        .pipe(babel({
            presets: ['@babel/env']
        }))       
        // 文件合并，不支持es6语法
        // .pipe(concat('bundle.min.js'))
        // 压缩
        .pipe(uglify())
        // 增加后缀名
        .pipe(rename({suffix:'.min'}))
        // 会在调试的时候报错，并将压缩代码转换成源码。
        // 不传参数，会在文件末尾增加，增加参数会在文件夹内生成独立文件
        // path 如相对路径对相对于文件的路径
        // addComment : true/false 处理文件后是否生成注释，默认true
        // .pipe(sourcemaps.write())       
        .pipe(sourcemaps.write('../map/',{addComment: true}))
        // 输出，文件夹不存在会自动创建
        .pipe(gulp.dest('./bulid/js'));
});

gulp.task('css',()=>{
    return gulp
        .src(['./src/css/**/*.css'])
        .pipe(concat("style.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('./bulid/css'))
})

// 默认任务
// gulp.task('default',['js']); 3.9及之前
// gulp 4.0
gulp.task('default', gulp.series('css',()=>{

}));