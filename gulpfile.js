var gulp = require("gulp")

var server = require("gulp-webserver")

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