var gulp = require("gulp");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var sass = require("gulp-sass");

var sassSourceFile = "css/style.scss";
var sassSourceFile1 = "**/*.scss";

var sassOptions = {
  outputStyle: "expanded",
  // outputStyle: "compressed",
};

gulp.task("scss", () => {
  return gulp
    .src(sassSourceFile)
    .pipe(sourcemaps.init())
    .pipe(
      sass(sassOptions).on("error", function (err) {
        log.error(err.message);
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css"));
});

gulp.task(
  "watch",
  gulp.series("scss", function () {
    gulp.watch(sassSourceFile1, gulp.parallel("scss"));
  })
);

gulp.task(
  "default",
  gulp.series("watch", function () {})
);
