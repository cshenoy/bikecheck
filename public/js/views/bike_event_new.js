BikeCheck.Views.BikeEventNew = Parse.View.extend({
  tagName: 'form',
  className: 'bike-event-form clearfix',
  template: _.template($('#bike-event-form-tmpl').html()),
  events: {
    'click .modal-back' : 'renderPreviousStep',
    'click .bike-event-hazard .bike-event-option' : 'selectHazard',
    'click .bike-event-submit' : 'submitBikeEvent'
  },

  initialize: function(attrs) {
    if (attrs) {
      this.eventType = attrs.eventType;
      this.map = attrs.map;
    }
  },

  render: function() {
    var self = this;
    this.$el.html(this.template());
    _.defer(function() {
      self.renderModalBackButton();
      return self.$('.bike-event-' + self.eventType).removeClass('hidden');
    });
    return this;
  },

  renderModalBackButton: function() {
    var view = new BikeCheck.Views.ModalBackButton();
    return this.$el.prepend(view.render().el);
  },

  selectHazard: function(e) {
    return $(e.currentTarget).toggleClass('selected');
  },

  renderPreviousStep: function() {
    $('.bike-event-options-container').removeClass('hidden');
    BikeCheck.setModalTitle('Choose BikeCheck Type');
    return this.$el.addClass('hidden');
  },

  submitBikeEvent: function(e) {
    if (!$(e.currentTarget).hasClass('disabled')) {
      var self = this;
      this.$('.bike-event-submit').addClass('disabled').text('Sending...');
      if (this.setBikeEventAttrs()) {
        this.model.save({
          success: function() {
            self.saved(self);
          },
          error: function() {
            console.log('fuuuuuucckkkk!!!!');
            self.$('.bike-event-submit').removeAttr('disabled').val('Submit');
          }
        });
      }
    }
  },

  setBikeEventAttrs: function() {
    return this.model.set({
      eventType  : this.eventType,
      date       : this.$('#bike-event-date:visible').val() || new Date().toJSON().slice(0,10),
      time       : this.$('#bike-event-time:visible').val(),
      bikeModel  : this.$('#bike-event-bike-model:visible').val(),
      bikeSerial : this.$('#bike-event-bike-serial').val(),
      traffic    : this.$('.bike-event-option.traffic:visible').hasClass('selected'),
      laneClosed : this.$('.bike-event-option.lane-closed:visible').hasClass('selected'),
      accident   : this.$('.bike-event-option.accident:visible').hasClass('selected'),
      other      : this.$('.bike-event-option.other:visible').hasClass('selected'),
      notes      : this.$('#bike-event-bike-notes:visible').val(),
      userId     : Parse.User.current().get('objectId')
    });
  },

  saved: function(self) {
    self.$('.bike-event-submit').removeClass('disabled').text('Submit');
    self.$el.addClass('hidden');

    var loc = new google.maps.LatLng(self.model.get('latLng').jb, self.model.get('latLng').kb);
    var marker = new google.maps.Marker({
      position: loc,
      map: self.map
    });
    var listItems = '';
    if (self.model.get('eventType') === 'hazard') {
      listItems += '<li>Hazard</li>';
      listItems += '<li>Date: ' + self.model.get('date') + '</li>';
      if (self.model.get('traffic') === true) {
        listItems += '<li>' + 'Traffic!</li>';
      }
      if (self.model.get('laneClosed') === true) {
        listItems += '<li>' + 'Lane Closed!</li>';
      }
      if (self.model.get('accident') === true) {
        listItems += '<li>' + 'Accident!</li>';
      }
      if (self.model.get('other') === true) {
        listItems += '<li>' + 'Something else is amiss...</li>';
      }
      listItems += '<li>' + self.model.get('notes') + '</li>';
    }

    if (self.model.get('eventType') === 'theft') {
      listItems += '<li>Theft</li>';
      listItems += '<li>' + 'Date: ' + self.model.get('date') + '</li>';
      listItems += '<li>' + 'Time: ' + self.model.get('time') + '</li>';
      listItems += '<li>' + 'Bike Model: ' + self.model.get('bikeModel') + '</li>';
      listItems += '<li>' + 'Bike Serial: ' + self.model.get('bikeSerial') + '</li>';
      listItems += '<li>' + 'Notes: ' + self.model.get('notes') + '</li>';
    }

    var contentString = '<div class="infobox">' +
        '<ul>' + listItems + '</ul>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(self.map, marker);
    });

    self.map.setOptions({ draggableCursor:'pointer' });

    var view = new BikeCheck.Views.BikeEventSaved();
    return BikeCheck.setModalBody(view.render().el);
  }
});
