var gulp = require("gulp")

var server = require("gulp-webserver")

var sass = require("gulp-sass");
//起服务
gulp.task('server',() => {
    return gulp.src("src")
    .pipe(server({
        port : 9997,
        proxies : [
            {
                source : "/api/get/list",
                target : "http://localhost:3000/api/get/list"
            }
        ]
    }))
})

gulp.task('sass',() => {
    return gulp.src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/css"))
})

gulp.task("watch",() => {
    return gulp.watch("./src/scss/*.scss",gulp.series("sass"));
})

gulp.task("dev",gulp.series("sass","server",'watch'))