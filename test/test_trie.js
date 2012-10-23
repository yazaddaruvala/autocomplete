var Trie = require('../lib/trie').Trie;

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
	exports[ name + ': INPUT ERROR: No input w/ callback' ] = function( test ) {
		test.expect(1);
		root[ name ]( 1, function ( err ) {
			test.ok( err );
			test.done();
		});
	};
	exports[ name + ': INPUT ERROR: Error in Callback' ] = function( test ) {
		test.expect(1);
		root[ name ]( 1, function ( err ) {
			test.ok( err );
			test.done();
		});
	};
};

var root = new Trie();
var expected = {
  root: { _name: '' , _isWord: false, _children: {} },
  a   : { _name: 'a', _isWord: false, _children: {} },
  an  : { _name: 'n', _isWord: false, _children: {} },
  and : { _name: 'd', _isWord: false, _children: {} }
};

exports['Root Creation'] = function (test) {
  test.deepEqual( root, expected.root );
  test.done();
};

// ALL THINGS SET
wrapperInputError( 'set', 'and' );

exports['Set: "and"'] = function (test) {
  test.expect(2);
			
	root['set']( 'and', function ( err ) {
  	test.ifError( err );
  	
  	expected.root._children['a'] = expected.a;
  	expected.a._children['n']    = expected.an;
  	expected.an._children['d']   = expected.and;
  	expected.and._isWord = true;
  	test.deepEqual( root, expected.root);
		test.done();
  });
};

exports['Set: "an"'] = function (test) {
  test.expect(2);
	root['set']( 'an', function ( err ) {
  	test.ifError( err );
    
  	expected.an._isWord = true;
  	test.deepEqual( root, expected.root );
  	test.done();
  });
};

// ALL THINGS DEL
wrapperInputError( 'del', 'and' );

exports['Del: word: "and"'] = function (test) {
	test.expect(2);
	root.del('and', function (err, res) {
	  test.ifError( err );
	  
		delete expected.and;
		delete expected.an._children['d'];
		test.deepEqual(root, expected.root );
		test.done();
	});
};

exports['Del: word: "and" again'] = function (test) {
	test.expect(2);
	root.del('and', function (err, res) {
  	test.ifError( err );

		delete expected.and;
		delete expected.an._children['d'];
		test.deepEqual(root, expected.root );
		test.done();
	});
};

// ALL ABOUT EMPTY
exports['isEmpty: Not empty'] = function( test ) {
  test.expect(1);
  root.isEmpty( function( err, value ) {
    test.strictEqual( value, false );
    test.done();
  });
};

exports['Empty'] = function( test ) {
  test.expect(1);
  root.empty( function() {
		test.deepEqual( root, new Trie() );
    test.done();
  });
};

exports['isEmpty: Empty'] = function( test ) {
  test.expect(1);
  root.isEmpty( function( err, value ) {
    test.strictEqual( value, true );
    test.done();
  });
};

// ALL ABOUT SETS
wrapperInputError( 'sets', [ 'an' ] );

exports['Sets: words: [ "an" ]'] = function( test ) {
  test.expect(1);
  root.sets( [ 'an' ], function() {
    test.deepEqual( root, expected.root );
    test.done();
  });
};

// ALL ABOUT EXISTS
wrapperInputError( 'exists', 'and' );

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
