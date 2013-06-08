BikeCheck.Views.SignUp = Parse.View.extend({
  tagName: 'form',
  className: 'signup-form',
  template: _.template($('#signup-tmpl').html()),
  events: {
    'submit #signup-submit': 'signUp'
  },

  initialize: function() {
    _.bindAll(this, 'signUp');
  },

  render: function() {
    this.$el.html(this.template());
    this.delegateEvents();
    return this;
  },

  signUp: function(e) {
    e.preventDefault();
    var creds = this.getLoginCreds('signup');
    this.attemptSignUp(creds);
    return this.$('.signup-submit').attr('disabled', 'disabled');
  },

  attemptSignUp: function(creds) {
    return Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
      success: function(user) {
        // load some new view!
        console.log('success!');
        self.undelegateEvents();
        delete self;
      },
      error: function(user, error) {
        self.$('.signup-form .error').html(error.message).show();
        self.$('.signup-submit').removeAttr('disabled');
      }
    });
  }
});

_.extend(BikeCheck.Views.SignUp.prototype, BikeCheck.Mixins.UserMGMTMixin);
