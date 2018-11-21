/*
  gulp：
    1. 是什么？基于流的自动化构建工具
    2. 特点： 基于流和异步构建
    3. 使用：
      - 下载插件
        npm i xxx -D
      - 引入插件
        const xxx = require('xxx');
      - 配置插件任务
        gulp.task(任务名, 任务的回调函数)
      - 配置默认任务
        gulp.task('default', [任务1， 任务2， 任务3...])
    4. 如何启动任务
      gulp 任务名  例如: gulp jshint
 */
//引入插件
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

//配置插件任务

//语法检查
gulp.task('jshint', () => {
  return gulp.src('./src/js/*.js')   //将指定目录下所有js文件全部导入到gulp的流中
    .pipe(jshint({
      esversion: 6
    }))   //对gulp流中的文件做了语法检查
    .pipe(jshint.reporter('default'));  //将语法检查的错误在控制台打印输出
})
//语法转化
gulp.task('babel', () =>
  gulp.src('src/js/*.js')
    .pipe(babel({   //对gulp流中的文件做了语法转化
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))  //将gulp流中的文件输出到指定目录中
);
//browserify 将commonjs模块化语法转化为浏览器能识别的语法
gulp.task('browserify', function() {
  // Single entry point to browserify
  gulp.src('build/js/index.js')
    .pipe(browserify())  //将commonjs模块化语法转化为浏览器能识别的语法
    .pipe(rename('built.js'))  //将gulp流中的文件重命名
    .pipe(gulp.dest('./build/js')) //将gulp流中的文件输出到指定目录中
});

//配置默认任务
gulp.task('default', ['jshint', 'babel', 'browserify'])