BikeCheck.Views.LogIn = Parse.View.extend({
  className: 'login',
  template: _.template($('#login-tmpl').html()),
  events: {
    "submit form.login-form": "logIn",
    "submit form.signup-form": "signUp"
  },

  initialize: function() {
    _.bindAll(this, "logIn", "signUp");
  },

  render: function() {
    this.$el.html(this.template());
    this.delegateEvents();
    return this;
  },

  logIn: function(e) {
    // e.preventDefault();
    var self = this,
        username = this.$("#login-username").val(),
        password = this.$("#login-password").val();

    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log('success!');
        // load some new view!
        self.undelegateEvents();
        delete self;
     },
      error: function(user, error) {
        self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
        self.$(".login-form button").removeAttr("disabled");
      }
    });

    this.$(".login-form button").attr("disabled", "disabled");
    return false;
  },

  signUp: function(e) {
    // e.preventDefault();
    var self = this,
        username = this.$("#signup-username").val(),
        password = this.$("#signup-password").val();

    Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
      success: function(user) {
        // load some new view!
        console.log('success!');
        self.undelegateEvents();
        delete self;
      },
      error: function(user, error) {
        self.$(".signup-form .error").html(error.message).show();
        this.$(".signup-form button").removeAttr("disabled");
      }
    });

    this.$(".signup-form button").attr("disabled", "disabled");
    return false;
  }
});
