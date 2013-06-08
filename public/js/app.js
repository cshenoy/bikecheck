$(function() {
  Parse.$ = jQuery;
  Parse.initialize("JfnQBEqS47BirgQbg6LrlLzTBndhqWlOLU7p74zt",
                   "5W0E5XDFoKa2OHRSKbQt6bVu1mmIRzjrHDnALhww");

  BikeCheck.initialize();
});

// // var TestObject = Parse.Object.extend("TestObject");
// // var testObject = new TestObject();
// //   testObject.save({foo: "bar"}, {
// //   success: function(object) {
// //     $(".success").show();
// //   },
// //   error: function(model, error) {
// //     $(".error").show();
// //   }
// // });
