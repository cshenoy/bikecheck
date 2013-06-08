BikeCheck.Views.LogIn = Parse.View.extend({
  tagName: 'form',
  className: 'login-form',
  template: _.template($('#login-tmpl').html()),
  events: {
    'submit #login-submit': 'logIn'
  },

  initialize: function() {
    _.bindAll(this, 'logIn');
  },

  render: function() {
    this.$el.html(this.template());
    this.delegateEvents();
    return this;
  },

  attemptLogIn: function(creds) {
    var self = this;
    return Parse.User.logIn(creds.username, obj.password, {
      success: function(user) {
        console.log('success!');
        // load some new view!
        self.undelegateEvents();
        delete self;
     },
      error: function(user, error) {
        self.$('.login-form .error').html('Invalid username or password. Please try again.').show();
        self.$('.login-submit').removeAttr('disabled');
      }
    });
  },

  logIn: function(e) {
    e.preventDefault();
    var creds = this.getLoginCreds('login');
    this.attemptLogIn(creds);
    return this.$('.login-submit').attr('disabled', 'disabled');
  }
});

_.extend(BikeCheck.Views.LogIn.prototype, BikeCheck.Mixins.UserMGMTMixin);
