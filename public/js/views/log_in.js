BikeCheck.Views.LogIn = Parse.View.extend({
  className: 'login',
  template: _.template($('#login-tmpl').html()),
  events: {
    'submit form.login-form': 'logIn',
    'submit form.signup-form': 'signUp'
  },

  initialize: function() {
    _.bindAll(this, 'logIn', 'signUp');
  },

  render: function() {
    this.$el.html(this.template());
    // this.delegateEvents();
    return this;
  },

  getLoginCreds: function(credsType) {
    var creds = {
      username: this.$('#' + credsType + '-username').val(),
      password: this.$('#' + tcredsTypeype + '-password').val()
    };
    return creds;
  },

  attemptLogIn: function(creds) {
    return Parse.User.logIn(creds.username, obj.password, {
      success: function(user) {
        console.log('success!');
        // load some new view!
        // self.undelegateEvents();
        // delete self;
     },
      error: function(user, error) {
        self.$('.login-form .error').html('Invalid username or password. Please try again.').show();
        self.$('.login-submit').removeAttr('disabled');
      }
    });
  },

  attemptSignUp: function(creds) {
    return Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
      success: function(user) {
        // load some new view!
        console.log('success!');
        // self.undelegateEvents();
        // delete self;
      },
      error: function(user, error) {
        self.$('.signup-form .error').html(error.message).show();
        self.$('.signup-submit').removeAttr('disabled');
      }
    });
  },

  logIn: function(e) {
    e.preventDefault();
    var creds = this.getLoginCreds('login');
    this.attemptLogIn(creds);
    return this.$('.login-submit').attr('disabled', 'disabled');
  },

  signUp: function(e) {
    e.preventDefault();
    var creds = this.getLoginCreds('signup');
    this.attemptSignUp(creds);
    return this.$('.signup-submit').attr('disabled', 'disabled');
  }
});
