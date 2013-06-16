// index.js
var Kaiseki = require('kaiseki');

// Settings
var authKeys = require('../settings/authentication.json');

// instantiate
var APP_ID = authKeys.parse.app_id;
var REST_API_KEY = authKeys.parse.rest_api_key;
var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);

routes = function(app){

	// Home page with map full screen
	app.get('/', function(req, res){
		res.render('index', {
			title: 'BikeCheck',
			map: true
		});
	});

	app.get('/json/all', function(req, res){
		kaiseki.getObjects('BikeEvent', function(err, res, body, success){
			printAll(body, success);
		});

		function printAll(b, bool){
			if(bool) res.json(b);
			else {
				res.json({});
			}
		}
	});

	app.get('/newBikeEvent', function(req, res){
	});
};


module.exports = routes;