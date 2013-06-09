BikeCheck.Views.Map = Parse.View.extend({
  id: 'map-canvas',
  events: {

  },

  initialize: function(){
    _.bindAll(this, 'add', 'addMarker', 'checkMarkers', 'iconBase');
    this.render();
  },

  iconBase: function(){
    return '/images/markers/';
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

	  if (!Parse.User.current()) {
	    this.markerBtn.className += ' hidden';
	  }

	  var insideBtn = document.createElement('div');
	  insideBtn.style.borderWidth = '1px';
	  insideBtn.style.borderStyle = 'solid';
	  insideBtn.style.borderColor = 'black';
	  insideBtn.style.backgroundColor = 'white';
		insideBtn.style.cursor = 'pointer';
		this.markerBtn.appendChild(insideBtn);

		var controlText = document.createElement('div');
		controlText.style.fontFamily = 'Lato,Arial,sans-serif';
	  controlText.style.fontSize = '16px';
	  controlText.style.padding = '15px';
	  controlText.style.backgroundColor = '#1ABC9C';
	  controlText.style.color = '#fff';
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

  addMarker: function(be, b){
    var bikeEvent = new BikeCheck.Models.BikeEvent(be);

  	loc = bikeEvent.get('latLng') || bikeEvent.get('location'); // grabs just lat-long coords
  	var self = this,
        blig = this.map,
  			marker,
  			newBikeEvent;

    // b is a boolean to check whether loc is from map click
    // or db call
    if (b) {
      loc = new google.maps.LatLng(loc.jb, loc.kb);
      marker = new google.maps.Marker({
        position: loc,
        map: blig,
        icon: this.iconBase() + bikeEvent.get('eventType') + '.png'
      });

      var listItems = '';

      if (bikeEvent.get('eventType') === 'hazard') {
        listItems += '<li>Hazard</li>';
        listItems += '<li>Date: ' + bikeEvent.get('date') + '</li>';
        if (bikeEvent.get('traffic') === true) {
          listItems += '<li>' + 'Traffic!</li>';
        }
        if (bikeEvent.get('laneClosed') === true) {
          listItems += '<li>' + 'Lane Closed!</li>';
        }
        if (bikeEvent.get('accident') === true) {
          listItems += '<li>' + 'Accident!</li>';
        }
        if (bikeEvent.get('other') === true) {
          listItems += '<li>' + 'Something else is amiss...</li>';
        }
        listItems += '<li>' + bikeEvent.get('notes') + '</li>';
      }

      if (bikeEvent.get('eventType') === 'theft') {
        listItems += '<li>Theft</li>';
        listItems += '<li>' + 'Date: ' + bikeEvent.get('date') + '</li>';
        listItems += '<li>' + 'Time: ' + bikeEvent.get('time') + '</li>';
        listItems += '<li>' + 'Bike Model: ' + bikeEvent.get('bikeModel') + '</li>';
        listItems += '<li>' + 'Bike Serial: ' + bikeEvent.get('bikeSerial') + '</li>';
        listItems += '<li>' + 'Notes: ' + bikeEvent.get('notes') + '</li>';
      }

      var contentString = '<div class="infobox">' +
          '<ul>' + listItems + '</ul>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(this.map, marker);
      });
    } else {
        var view = new BikeCheck.Views.BikeEventOptions({ model: bikeEvent, map: this.map });
        return BikeCheck.displayModal().appendToModalBody(view.render().el);
    }
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