BikeCheck.Views.Map = Parse.View.extend({
  id: 'map-canvas',
  events: {

  },

  initialize: function(){
  	_.bindAll(this, 'add', 'addMarker', 'checkMarkers');
  	this.render();
  },

  render: function(){
  	this.mapOptions = {
	    center: new google.maps.LatLng(38.8935965, -77.014576),
	    zoom: 13,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };

	  this.map = new google.maps.Map(document.getElementById(this.id), this.mapOptions);

	  // Add Marker Btn
	  this.markerBtn = document.createElement('div');
	  this.markerBtn.style.padding = '5px';
	  this.markerBtn.style.margin = '5px';
	  this.markerBtn.className = 'add-marker';

	  var insideBtn = document.createElement('div');
	  insideBtn.style.borderWidth = '1px';
	  insideBtn.style.borderStyle = 'solid';
	  insideBtn.style.borderColor = 'black';
	  insideBtn.style.backgroundColor = 'white';
		insideBtn.style.cursor = 'pointer';
		this.markerBtn.appendChild(insideBtn);

		var controlText = document.createElement('div');
		controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = 'Add Marker!';
	  insideBtn.appendChild(controlText);

	  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.markerBtn);

	  google.maps.event.addDomListener(this.markerBtn, 'click', this.add);

    this.checkMarkers();

		return this;
  },

  add: function(){
  	this.map.setOptions({draggableCursor:'crosshair'});
  	google.maps.event.addDomListenerOnce(this.map, 'click', this.addMarker);
  },

  addMarker: function(loc, b){
  	loc = loc.latLng || loc.location; // loc grabs just lat-long coords
  	var self = this,
        blig = this.map,
  			marker,
  			newBikeEvent;

    // b is a boolean to check whether loc is from map click
    // or db call
    if (b) {
      loc = new google.maps.LatLng(loc.jb, loc.kb);
    }

  	marker = new google.maps.Marker({
      position: loc,
      map: blig
    });

    var bikeEvent = new BikeCheck.Models.BikeEvent({ latLng: marker.position }),
        view = new BikeCheck.Views.BikeEventOptions({ model: bikeEvent, map: this.map, mapMarker: marker });
    return BikeCheck.displayModal().appendToModalBody(view.render().el);
  },

  checkMarkers: function(){
    var self = this;
    $.get('/json/all', function(d){
      for(var i in d){
        self.addMarker(d[i], true);
      }
    });

  }
});