BikeCheck.Views.Modal = Parse.View.extend({
  tagName: 'section',
  className: 'modal',
  template: _.template($('#modal').html()),

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
