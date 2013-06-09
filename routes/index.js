// index.js
var Kaiseki = require('kaiseki');

// instantiate
var APP_ID = 'JfnQBEqS47BirgQbg6LrlLzTBndhqWlOLU7p74zt';
var REST_API_KEY = 'Ei57rw4ouA30Zk5Vg5jYGX2F2uVLiQFZ2CQfUird';
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