BikeCheck.Views.BikeEventNew = Parse.View.extend({
  tagName: 'form',
  className: 'bike-event-form clearfix',
  template: _.template($('#bike-event-form-tmpl').html()),

  initialize: function(attrs) {
    if (attrs) {
      this.eventType = attrs.eventType;
    }
  },

  render: function() {
    this.$el.html(this.template());
    _.defer(function() {

    });
    return this;
  }
});
