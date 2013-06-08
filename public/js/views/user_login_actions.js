BikeCheck.Views.UserLoginActions = Parse.View.extend({
  tagName: 'nav',
  className: 'menu-nav pull-right',
  template: _.template($('#user-login-actions-tmpl').html()),
  events: {
    'click .menu-nav-link' : 'determineLoginAction'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  determineLoginAction: function(e) {
    var view,
        action = this.$(e.currentTarget).data('action');
    view = action === 'signup' ? new BikeCheck.Views.SignUp() : new BikeCheck.Views.LogIn();
    return $('body').append(view.render().el);
  }
});
