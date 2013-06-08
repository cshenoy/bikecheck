var BikeCheck = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    var view,
      $elem = $('#bike-check');
    if (Parse.User.current()) {
      // view = new BikeCheck.Views.
      console.log('logged in!');
    } else {
        view = new BikeCheck.Views.LogIn();
        $elem.html(view.render().el);
    }
    return false;
  }
};
