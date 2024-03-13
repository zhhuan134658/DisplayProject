const gulp = require('gulp');
const rimraf = require('rimraf');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const alias = require('gulp-ts-alias');
const mapStream = require('map-stream');

const tsProject = ts.createProject('tsconfig.json');

const srcDir = ['./.debug/**/*.js', './.debug/**/*.ts', './.debug/**/*.tsx'];
const suiteConfig = require('./src/config.json');
const bizType = suiteConfig.bizType.replace(/[^a-zA-Z0-9]/gi,'');
const regDrawer = /<Drawer([^\я]*?)>([^\я]*?)<\/Drawer>/g;
const regModal = /<Modal([^\я]*?)>([^\я]*?)<\/Modal>/g;
gulp.task('clean', async () => {
  rimraf.sync('./lib');
});

gulp.task('compile-ts', () => {
  return gulp
    .src(srcDir)
    .pipe(mapStream(function(file,cb){
      var fileContents = file.contents.toString(); 
      // ---在这里执行任何字符串操作--- 
      fileContents = fileContents.replace(regDrawer, function(i,j,k) {
        return `<Drawer className="${bizType}" ${j}>${k}</Drawer>`
      });
      fileContents = fileContents.replace(regModal, function(i,j,k) {
        return `<Modal className="${bizType}" ${j}>${k}</Modal>`
      });
      // -------------------- ------------------- 
      file.contents = new Buffer(fileContents); 
      cb(null,file); 
     }))
    .pipe(plumber())
    .pipe(alias({ configuration: tsProject.config }))
    .pipe(tsProject())
    .pipe(plumber.stop())
    .pipe(gulp.dest('lib'));
});

gulp.task('compile-less', () => {
  return gulp
    .src(['.debug/**/*.less'])
    .pipe(mapStream(function(file,cb){
      var fileContents = file.contents.toString(); 
      // ---在这里执行任何字符串操作--- 
      fileContents = '.' + bizType + '{' + fileContents + '}';
      // -------------------- ------------------- 
      file.contents = new Buffer(fileContents); 
      cb(null,file); 
     }))
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest('lib'));
});

gulp.task('copy-less', () => {
  return gulp
    .src('.debug/**/*.less', { base: '.debug' })
    .pipe(mapStream(function(file,cb){
      var fileContents = file.contents.toString(); 
      // ---在这里执行任何字符串操作--- 
      fileContents = '.' + bizType + '{' + fileContents + '}';
      // -------------------- ------------------- 
      file.contents = new Buffer(fileContents); 
      cb(null,file); 
     }))
    .pipe(gulp.dest('lib'));
});

gulp.task('default', gulp.series('clean', 'compile-ts', 'compile-less', 'copy-less'));