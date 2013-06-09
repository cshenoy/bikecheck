$(function() {
  Parse.$ = jQuery;
  Parse.initialize("JfnQBEqS47BirgQbg6LrlLzTBndhqWlOLU7p74zt",
                   "5W0E5XDFoKa2OHRSKbQt6bVu1mmIRzjrHDnALhww");

  BikeCheck.initialize();



  // FUCK ALL OF THIS
  $(document).on('click', '.menu .has-callout', function(e) {
    return BikeCheck.toggleCallout(this);
  });

  $('body').click(function(e) {
    if (!$(e.target).is('.has-callout, .menu-nav-link-dropdown *, .menu-nav-link-dropdown')) {
      return $('.menu-nav-link-dropdown.active').removeClass('active');
    }
  });

  $(document).on('click', '.blah', function() {
    var bikeEvent = new BikeCheck.Models.BikeEvent(),
        view = new BikeCheck.Views.BikeEventOptions({ model: bikeEvent });
    return BikeCheck.displayModal().appendToModalBody(view.render().el);
  });

  $(document).on('click', '.modal-close', function() {
    return BikeCheck.closeModal();
  });
});
