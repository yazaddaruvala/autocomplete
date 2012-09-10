var Autocomplete = require('../lib/autocomplete').Autocomplete;

var ac = new Autocomplete();

ac.sets( 'hi there how are you'.split(' '), function() {
  ac.match('h', function( err, res ) {
    // Match would return an err if the prefix doesn't exist.
    // However, it does so we can use the response.
    console.log( res );
  });
});