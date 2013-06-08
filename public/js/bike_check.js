var BikeCheck = {
  Models: {},
  Collections: {},
  Views: {},
  Mixins: {},

  initialize: function() {
    var view,
      $elem = $('.menu-nav');
    if (Parse.User.current()) {
      // view = new BikeCheck.Views.
      console.log('logged in!');
      Parse.User.logOut();
    } else {
        view = new BikeCheck.Views.UserLoginActions();
        $elem.prepend(view.render().el);
    }
  },

  toggleCallout: function(self, e) {
    var action = $(self).data('action');
    $('.menu-nav-link-dropdown').toggleClass('active');
    if (action) {
      this.renderLoginAction(action);
    }
  },

  renderLoginAction: function(action) {
    var view = action === 'signup' ? new BikeCheck.Views.SignUp() : new BikeCheck.Views.LogIn();
    return $('.menu-login-inner').html(view.render().el);
  }
};
