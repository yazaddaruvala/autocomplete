var Autocomplete = require('../lib/autocomplete').Autocomplete;

var wrapperInputError = function( name, input ) {
  exports[ name + ': INPUT ERROR: Empty' ] = function( test ) {
    root[ name ]();
    test.done();
  };
  exports[ name + ': INPUT ERROR: Not ' + typeof( input ) ] = function( test ) {
    if ( typeof( input ) === 'number' ) root[ name ]( ' ' );
    else root[ name ]( 1 );
    test.done();
  };
	exports[ name + ': INPUT ERROR: No callback' ] = function( test ) {
		root[ name ]( input );
		test.done();
	};
	exports[ name + ': INPUT ERROR: Error in Callback' ] = function( test ) {
		test.expect(1);
		root[ name ]( 1, function ( err ) {
			test.ok( err );
			test.done();
		});
	};
};

var root = new Autocomplete();
var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
root.sets( words );

// ALL ABOUT MATCH
wrapperInputError( 'match', [ 'a' ] );

exports['Match: Not a Prefix'] = function (test) {
	test.expect(1);
	root.match('f', function( err, res ) {
		test.ok( err );
		test.done();	
	});
};

exports['Match'] = function (test) {
	test.expect(2);
	var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
	root.sets(words);
	root.match('a', function( err, res ) {
	  test.ifError( err );
	  
		test.deepEqual( res, words.slice(1) );
		test.done();	
	});
};
