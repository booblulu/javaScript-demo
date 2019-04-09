const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      babel = require('gulp-babel'),
      sourcemaps = require('gulp-sourcemaps'),
      cssmin = require('gulp-cssmin'),
      imagemin = require('gulp-imagemin'),
      watch = require('gulp-watch'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload;

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
        .pipe(sourcemaps.write('../map/',{addComment: false}))
        // 输出，文件夹不存在会自动创建
        .pipe(gulp.dest('./bulid/src/js'))
});

gulp.task('css',()=>{
    return gulp
        .src(['./src/css/**/*.css'])
        .pipe(concat("style.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('./bulid/src/css'));
})

gulp.task('html',()=>{
    return gulp
        .src(['./*.html'])
        .pipe(gulp.dest('./bulid/'));
})

gulp.task('image',()=>{
    return gulp
        .src(['./src/images/**/*.jpg','./src/images/**/*.gif','./src/images/**/*.png'])
        .pipe(imagemin([
            // 加载逐渐变得清楚，隔行
            imagemin.gifsicle({interlaced: true}),
            // 渐进式
            imagemin.jpegtran({propressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('./bulid/src/images/'));
})

// 监测，当数据发生改变时，会自动压缩
// gulp.task('watch',()=>{
//     // 监听服务器
//     livereload.listen();
//     gulp.watch([
//         './src/js/**/*.js',
//         './index.html'
//     ],
//     gulp.series('js'),
//     file=>{
//         livereload.changed(file.path);
//     });
// })

gulp.task('watch',()=>{
    gulp.watch(['./src/js/**/*.js'],gulp.series('js'));
    reload();
})

// 默认任务
// gulp.task('default',['js']); 3.9及之前
// gulp 4.0
gulp.task('default', gulp.series('html','js','css','image','watch'),()=>{
     // 从这个项目的根目录启动服务器
     browserSync({
        server: {
            baseDir: "./",
            index: 'index.html'
        }
    });
});
