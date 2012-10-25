var Autocomplete = require('../lib/autocomplete').Autocomplete;

var root = new Autocomplete();
var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
root.sets( words );

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

exports['Score: Word Doesn\'t Exist'] = function (test) {
	test.expect(1);
  root.score( 'Sasd', function( err, score ) {
    test.ok( err );
    test.done();
  });
};

exports['Score: word: and'] = function (test) {
	test.expect(2);
  root.score( 'and', function( err, score ) {
    test.ifError( err );
    
    test.equal( 0, score );
    test.done();
  });
};

exports['Inc: word: and'] = function (test) {
	test.expect(3);
	root.inc( 'and', function( err ) {
	  test.ifError( err );
	  
    root.score( 'and', function( err, score ) {
      test.ifError( err );
      
      test.equal( 1, score );
      test.done();
    });
  });
};

exports['Dec: word: and'] = function (test) {
	test.expect(3);
	root.dec( 'and', function( err ) {
	  test.ifError( err );
	  
    root.score( 'and', function( err, score ) {
      test.ifError( err );
      
      test.equal( 0, score );
      test.done();
    });
  });
};