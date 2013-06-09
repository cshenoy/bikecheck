BikeCheck.Views.BikeEventSaved = Parse.View.extend({
  template: _.template($('#bike-event-saved-tmpl').html()),
  events: {
    'click .bike-event-saved-add' : 'addBikeEvent'
  },

  render: function() {
    this.$el.html(this.template());
    BikeCheck.setModalTitle('Success!');
    return this;
  },

  addBikeEvent: function() {
    BikeCheck.closeModal();
    return $('.add-marker').click();
    // var bikeEvent = new BikeCheck.Models.BikeEvent(),
    //     view = new BikeCheck.Views.BikeEventOptions({ model: bikeEvent });
    // return BikeCheck.setModalBody(view.render().el);
  }
});
