BikeCheck.Views.BikeEventOptions = Parse.View.extend({
  className: 'options-container align-center',
  template: _.template($('#bike-event-options').html()),
  events: {
    'click .bike-event-option' : 'renderEventForm'
  },

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    this.$el.html(this.template());
    _.defer(function() { BikeCheck.setModalTitle('Choose Category').removeModalBackButton(); });
    return this;
  },

  renderEventForm: function(e) {
    var eventType = e.currentTarget.dataset.event_type,
        bikeEvent = new BikeCheck.Models.BikeEvent(),
        view = new BikeCheck.Views.BikeEventNew({ model: bikeEvent, eventType: eventType });
    BikeCheck.appendToModalBody(view.render().el);
    return this;
  }

  // renderBackArrow: function() {
  //   var html =
  //     '<div class="back toPostOptions">' +
  //       '<div class="text">Back</div>' +
  //       '<div class="icon-arrow-left"></div>' +
  //     '</div>';
  //   $('.modal-header').prepend(html);
  // },
  //
  // renderNewCommuteForm: function() {
  //   var commute = new RidePost.Models.Commute();
  //   var view = new RidePost.Views.PostLocationsNew({ model: commute });
  //   RidePost.appendToModalBody($('#post-form-steps').html());
  //   $('.post-form-locations').html(view.render().el);
  //   RidePost.enablePlaceholderText();
  //   return this;
  // }
});