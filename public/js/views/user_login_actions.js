BikeCheck.Views.UserLoginActions = Parse.View.extend({
  className: 'table-row',
  template: _.template($('#user-login-actions-tmpl').html()),
  events: {
    'click .menu-nav-link' : 'determineLoginAction'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  determineLoginAction: function(e) {
    var action = this.$(e.currentTarget).data('action');
    return BikeCheck.renderLoginAction(action);
  }
});
