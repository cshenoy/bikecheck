BikeCheck.Views.ModalBackButton = Parse.View.extend({
  tagName: 'a',
  className: 'modal-back',
  titleName: 'Back to previous step',
  template: _.template($('#modal-back-btn-tmpl').html()),

  render: function() {
    var modalHeaderHeight = $('.modal-header').height();
    this.$el.html(this.template()).css('height', modalHeaderHeight);
    return this;
  }
});
