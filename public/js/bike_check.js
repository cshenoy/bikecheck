var BikeCheck = {
  Models: {},
  Collections: {},
  Views: {},
  Mixins: {},

  initialize: function() {
    var view,
      $elem = $('.menu-inner');
    if (Parse.User.current()) {
      // view = new BikeCheck.Views.
      console.log('logged in!');
      Parse.User.logOut();
    } else {
        view = new BikeCheck.Views.UserLoginActions();
        $elem.prepend(view.render().el);
    }
  }
};
