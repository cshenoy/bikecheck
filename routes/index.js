// index.js


routes = function(app){

	// Home page with map full screen
	app.get('/', function(req, res){
		res.render('index', {
			title: 'BikeCheck'
		});
	});
};


module.exports = routes;