var Trie = require('../lib/trie').Trie;

var root = new Trie();
var expected = {
  root: { name: '' , isWord: false, children: {} },
  a   : { name: 'a', isWord: false, children: {} },
  an  : { name: 'n', isWord: false, children: {} },
  and : { name: 'd', isWord: false, children: {} }
};

exports['Root Creation'] = function (test) {
  test.deepEqual( root, expected.root );
  test.done();
};

// ALL THINGS SET
exports['Set: INPUT ERROR: Empty'] = function (test) {
  root.set();
  test.done();
};

exports['Set: INPUT ERROR: Not String'] = function (test) {
  root.set( 1 );
  test.done();
};

exports['Set: INPUT ERROR: String no Callback'] = function (test) {
  root.set( "and" );
  test.done();
};

exports['Set: INPUT ERROR: Error in Callback'] = function (test) {
  test.expect(1);
  root.set( 1, function ( err ) {
		test.ok( err );
		test.done();
	});
};

exports['Set: "and"'] = function (test) {
  test.expect(2);
			
	root.set( 'and', function ( err ) {
  	test.ifError( err );
  	
  	expected.root.children['a'] = expected.a;
  	expected.a.children['n']    = expected.an;
  	expected.an.children['d']   = expected.and;
  	expected.and.isWord = true;
  	test.deepEqual( root, expected.root);
		test.done();
  });
};

exports['Set: "an"'] = function (test) {
  test.expect(2);
	root.set( 'an', function ( err ) {
  	test.ifError( err );
    
  	expected.an.isWord = true;
  	test.deepEqual( root, expected.root );
  	test.done();
  });
};

// ALL THINGS DEL
exports['Del: INPUT ERROR: Empty'] = function (test) {
	root.del();
	test.done();
};

exports['Del: INPUT ERROR: Not String'] = function (test) {
	root.del( 1 );
	test.done();
};

exports['Del: INPUT ERROR: Sting no Callback'] = function (test) {
	root.del( "H" );
	test.done();
};

exports['Del: INPUT ERROR: Error in Callback'] = function (test) {
	test.expect(1);
	root.del( 1, function ( err ) {
		test.ok(err);
		test.done();
	});
};

exports['Del: word: "and"'] = function (test) {
	test.expect(2);
	root.del('and', function (err, res) {
	  test.ifError( err );
	  
		delete expected.and;
		delete expected.an.children['d'];
		test.deepEqual(root, expected.root );
		test.done();
	});
};

exports['Del: word: "and" again'] = function (test) {
	test.expect(2);
	root.del('and', function (err, res) {
  	test.ifError( err );

		delete expected.and;
		delete expected.an.children['d'];
		test.deepEqual(root, expected.root );
		test.done();
	});
};

// ALL ABOUT EMPTY
exports['Empty'] = function( test ) {
  test.expect(1);
  root.empty( function() {
		test.deepEqual( root, new Trie() );
    test.done();
  });
};

// ALL ABOUT SETS
exports['Sets: INPUT ERROR: Empty'] = function( test ) {
  root.sets();
  test.done();
};

exports['Sets: INPUT ERROR: Not Array'] = function( test ) {
  root.sets( 1 );
  test.done();
};

exports['Sets: INPUT ERROR: Array no Callback'] = function( test ) {
  root.sets( [ 'an' ] ); 
  test.done();
};

exports['Sets: INPUT ERROR: Error in Callback'] = function( test ) {
  test.expect(1);
  root.sets( 1, function( err ) {
    test.ok( err );
    test.done();
  });
};

exports['Sets: words: [ "an" ]'] = function( test ) {
  test.expect(1);
  root.sets( [ 'an' ], function() {
    test.deepEqual( root, expected.root );
    test.done();
  });
};

// ALL ABOUT EXISTS
exports['Exists: INPUT ERROR: Empty'] = function( test ) {
	root.exists();
  test.done();
};

exports['Exists: INPUT ERROR: Not String'] = function( test ) {
	root.exists( 1 );
  test.done();
};

exports['Exists: INPUT ERROR: String no Callback'] = function( test ) {
	root.exists( 'H' );
	test.done();
};

exports['Exists: INPUT ERROR: Error in Callback'] = function( test ) {
	test.expect(1);
	root.exists( 1, function( err, res ) {
	  test.ok( err );
	  test.done();
	});
};

//These tests should fail if 'set' and 'sets' were actually async
exports['Exists: "Hell"'] = function (test) {
	test.expect(1);
  root.set('Hello', function() {
    console.log("Hello is set");
  });
	root.exists('Hell', function( err, res ) {
	  test.strictEqual( false, res );
	  test.done();
	});
};

exports['Exists: "Helloo"'] = function (test) {
	test.expect(1);
	root.exists('Helloo', function( err, res ) {
	  test.strictEqual( false, res );
		test.done();
	});
};

exports['Exists: "Hello"'] = function (test) {
	test.expect(1);
	root.exists('Hello', function( err, res ) {
	  test.strictEqual( true, res );
		test.done();
	});
};

// ALL ABOUT MATCH
exports['Match: INPUT ERROR: Empty'] = function (test) {
  root.match();
  test.done();
};

exports['Match: INPUT ERROR: Not String'] = function( test ) {
	root.match( 1 );
  test.done();
};

exports['Match: INPUT ERROR: String no Callback'] = function( test ) {
	root.match( 'H' );
  test.done();
};

exports['Match: INPUT ERROR: Error in Callback'] = function (test) {
  test.expect(1);
	root.match( 1, function( err, res ) {
	  test.ok( err );
	  test.done();
	});
};

exports['Match: Not a Prefix'] = function (test) {
	test.expect(1);
	var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
	root.sets(words);
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
