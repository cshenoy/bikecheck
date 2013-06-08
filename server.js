var express = require('express'),
		routes = require('./routes'),
  	http = require('http'),
  	path = require('path'),
		app = express();

app.configure(function () {
	app.engine('.html', require('ejs').__express);
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.use(express.static(path.join(__dirname, 'public')));
});

require('./routes/index')(app);

app.listen(app.get('port'), function(port) {
  console.log("Listening on " + app.get('port'));
});