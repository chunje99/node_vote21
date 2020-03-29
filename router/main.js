var http = require('http');
var qs = require('querystring');

module.exports = function (app) {
   app.get('/', function (req, res) {
      res.render('index.html')
   });
   app.get('/:name', function (req, res) {
      console.log(req.params.name);
      const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      var options = {
         host: 'vote21.wtest.biz',
         port: '80',
         path: '/api/log_access.php?url=' + qs.escape(req.params.name) + '&ip=' + addr
      };
      var api = http.request(options, (response)=>{
         var body;
         response.on('data', function (data) {
            body += data;
         });
         response.on('error', function () {
            console.log('error');
         });
         response.on('end', function () {
            console.log(api.path + ' : ' + response.statusCode);
         });
      });
      api.on('error', function (err) {
         console.log(err);
      });
      api.end();
      try {
         res.render('vote/' + req.params.name + '.html');
      } catch(exception){
         console.log(exception.message);
         res.render('index.html');
      }
   });
}