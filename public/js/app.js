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
});
