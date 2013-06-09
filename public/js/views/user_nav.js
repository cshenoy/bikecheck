BikeCheck.Views.UserNav = Parse.View.extend({
  className: 'table-row',
  template: _.template($('#user-nav-tmpl').html()),
  events: {
    'click .logout' : 'logout'
  },

  render: function() {
    var self = this;
    this.$el.html(this.template());
    _.defer(function() {
      self.$('.user-first-name').html(self.model.get('username'));
    });
    return this;
  },

  logout: function() {
    BikeCheck.renderUserLoginActions();
    Parse.User.logOut();
    $('.add-marker').addClass('hidden');
  }
});
