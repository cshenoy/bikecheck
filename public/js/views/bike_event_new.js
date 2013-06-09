BikeCheck.Views.BikeEventNew = Parse.View.extend({
  tagName: 'form',
  className: 'bike-event-form clearfix',
  template: _.template($('#bike-event-form-tmpl').html()),
  events: {
    'click .modal-back' : 'renderPreviousStep'
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

  renderPreviousStep: function() {
    this.$el.addClass('hidden');
    return $('.bike-event-options-container').removeClass('hidden');
  }
});
