BikeCheck.Views.BikeEventOptions = Parse.View.extend({
  className: 'bike-event-options-container align-center',
  template: _.template($('#bike-event-options-tmpl').html()),
  events: {
    'click .bike-event-option' : 'renderEventForm'
  },

  initialize: function(attrs) {
    _.bindAll(this, 'render');
    if (attrs) {
      this.map = attrs.map;
      this.mapMarker = attrs.mapMarker
    }
  },

  render: function() {
    this.$el.html(this.template());
    _.defer(function() { BikeCheck.setModalTitle('Choose BikeCheck Type').removeModalBackButton(); });
    return this;
  },

  renderEventForm: function(e) {
    var eventType = e.currentTarget.dataset.event_type,
        view = new BikeCheck.Views.BikeEventNew({ model: this.model, eventType: eventType, map: this.map, mapMarker: this.mapMarker }),
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
