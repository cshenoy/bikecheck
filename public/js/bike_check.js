var BikeCheck = {
  Models: {},
  Collections: {},
  Views: {},
  Mixins: {},

  initialize: function() {
    var map;
    Parse.User.current() ? this.renderUserNav() : this.renderUserLoginActions();
    map = new BikeCheck.Views.Map();
  },

  getLoginCreds: function(credsType) {
    var creds = {
      username: $('#' + credsType + '-username').val(),
      password: $('#' + credsType + '-password').val()
    };
    return creds;
  },

  toggleCallout: function(self, e) {
    var action = $(self).data('action');
    $('.menu-nav-link-dropdown').toggleClass('active');
    if (action) {
      this.renderLoginAction(action);
    }
  },

  renderUserNav: function() {
    $('.menu-nav-link-dropdown.active').removeClass('active')
    var user = Parse.User.current();
    var view = new BikeCheck.Views.UserNav({ model: user });
    return $('.menu-nav-user').html(view.render().el);
  },

  renderUserLoginActions: function() {
    view = new BikeCheck.Views.UserLoginActions();
    return $('.menu-nav-user').html(view.render().el);
  },

  renderLoginAction: function(action) {
    var view = action === 'signup' ? new BikeCheck.Views.SignUp() : new BikeCheck.Views.LogIn();
    return $('.menu-login-inner').html(view.render().el);
  },

  setModalTitle: function(text) {
    $('.modal-title').text(text);
    return this;
  },

  displayModal: function(presetAttrs) {
    var modal = new BikeCheck.Views.Modal();
    if (!$('.modal-backdrop').is(':visible')) {
      $('body').append("<div class='modal-backdrop'></div>");
    }
    $(modal.render().el).insertAfter('.modal-backdrop');

    // $('.modal').drags();

    if (presetAttrs) {
      $.each(presetAttrs, function(index, value) {
        return $("[name=" + index + "]").val(value);
      });
    }

    window.scrollTo(0, 1);

    return this;
  },

  appendToModalBody: function(el) {
    window.scrollTo(0, 1);
    $('.modal-body').append(el);
    return this;
  },

  setModalBody: function(el) {
    window.scrollTo(0, 1);
    $('.modal-body').html(el);
    return this;
  },

  closeModal: function() {
    $('.modal').remove();
    $('.modal-backdrop').remove();
    return this;
  },

  removeModalBackButton: function() {
    $('.modal-header .back').remove();
    return this;
  }
};
