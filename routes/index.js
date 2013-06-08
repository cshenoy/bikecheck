// index.js


routes = function(app){

	// Home page with map full screen
	app.get('/', function(req, res){
		console.log(req.headers);
		res.render('index', {
			title: 'BikeCheck',
			map: true
		});
	});
};


module.exports = routes;