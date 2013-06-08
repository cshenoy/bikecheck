BikeCheck.Views.SignUp = Parse.View.extend({
  tagName: 'form',
  className: 'signup-form',
  template: _.template($('#signup-tmpl').html()),
  events: {
    'submit': 'signUp'
  },

  initialize: function() {
    _.bindAll(this, 'signUp');
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  attemptSignUp: function(creds) {
    var self = this;
    Parse.User.signUp(creds.username, creds.password, { ACL: new Parse.ACL() }, {
      success: function(user) {
        BikeCheck.renderUserNav();
      },
      error: function(user, error) {
        self.$('.signup-form .error').html(error.message).show();
        self.$('.signup-submit').removeAttr('disabled');
      }
    });
  },

  signUp: function(e) {
    e.preventDefault();
    var creds = BikeCheck.getLoginCreds('signup');
    this.attemptSignUp(creds);
    return this.$('.signup-submit').attr('disabled', 'disabled');
  }
});

_.extend(BikeCheck.Views.SignUp.prototype, BikeCheck.Mixins.UserMGMTMixin);
