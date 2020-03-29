var express = require('express');
var app = express();
var router = require('./router/main')(app);

var https = require('https');
var http = require('https');
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engin', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

// 404 처리 미들웨어
app.use(function(req, res, next) {
    console.log('404');
    next(createError(404));
  });
   
// 에러 핸들러
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err.message);
    // render the error page
    res.status(err.status || 500);
    res.render('notfound.html');
});
  
var server = app.listen(80, function(){
    console.log("Express server has started on port 80")
});

const ssl_options = {
    key: fs.readFileSync('ssl/private.key'),
    cert: fs.readFileSync('ssl/vote21_me.crt')
}

https.createServer(ssl_options, app).listen(443, function(){
    console.log("Express server has started on port 443")
});