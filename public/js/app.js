$(function() {
  Parse.$ = jQuery;
  Parse.initialize("JfnQBEqS47BirgQbg6LrlLzTBndhqWlOLU7p74zt",
                   "5W0E5XDFoKa2OHRSKbQt6bVu1mmIRzjrHDnALhww");

  BikeCheck.initialize();



  // FUCK ALL OF THIS
  $('.menu .has-callout').mouseenter(function(e) {
      $('.menu-nav-link-dropdown').removeClass('active')
      return BikeCheck.toggleCallout(this);
  }).mouseleave(function(e) {
    if ($(e.target).is('.menu-nav-link-dropdown')) {
      return $('.menu-nav-link-dropdown').removeClass('active');
    }
  });

  $('.menu .has-callout').on('click', function(e) {
    return BikeCheck.toggleCallout(this);
  });

  $('body').click(function(e) {
    console.log($(e.currentTarget));
    if (!$(e.target).is('.menu-nav-link-dropdown *, .menu-nav-link-dropdown')) {
      return $('.menu-nav-link-dropdown.active').removeClass('active');
    }
  });
});
