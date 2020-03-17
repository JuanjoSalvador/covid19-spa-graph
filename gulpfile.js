const { src, dest, series } = require('gulp')
const minify = require('gulp-minify')
const sass = require('gulp-sass')
const rename = require('gulp-rename')

function css() {
    return src('src/sass/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('public/css'))
  }
  
  function js() {
    return src('src/js/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(dest('public/js'))
  }

  exports.default = series(css, js)