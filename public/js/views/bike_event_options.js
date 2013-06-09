BikeCheck.Views.BikeEventOptions = Parse.View.extend({
  className: 'bike-event-options-container align-center',
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
        view = new BikeCheck.Views.BikeEventNew({ model: bikeEvent, eventType: eventType }),
        modalTitle;
    BikeCheck.appendToModalBody(view.render().el);
    modalTitle = this.getModalTitle(eventType);
    BikeCheck.setModalTitle(modalTitle);
    this.$el.addClass('hidden');
    return this;
  },

  getModalTitle: function(eventType) {
    var text;
    switch (eventType) {
    case 'theft':
      text = 'Missing Bike Info';
      break;
    case 'hazard':
      text = 'Select Hazards';
      break;
    default:
      text = "Info"
    }
    return text;
  }
});
