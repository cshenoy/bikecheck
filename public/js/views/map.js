BikeCheck.Views.Map = Parse.View.extend({
  id: 'map-canvas',
  events: {
  },

  initialize: function(){
  	console.log('this.id', this.id);
  	var mapOptions = {
	    center: new google.maps.LatLng(38.8935965, -77.014576),
	    zoom: 13,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  
	  var map = new google.maps.Map(document.getElementById(this.id), mapOptions);

		// google.maps.event.addDomListener(window, 'load', initialize);
  },

  render: function(){
  	console.log('render');
  }
});