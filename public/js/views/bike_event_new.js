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
    BikeCheck.setModalTitle('Choose Category');
    return this.$el.addClass('hidden');
  },

  submitBikeEvent: function(e) {
    e.preventDefault();
    var self = this;
    this.$('.bike-event-submit').attr('disabled', 'disabled').val('Sending...');
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
      other      : this.$('.bike-event-option.other:visible').hasClass('selected')
    });
  },

  saved: function(self) {
    self.$('.bike-event-submit').removeAttr('disabled').val('Submit');
    self.$el.addClass('hidden');
    var view = new BikeCheck.Views.BikeEventSaved();
    return BikeCheck.setModalBody(view.render().el);
  }
});
