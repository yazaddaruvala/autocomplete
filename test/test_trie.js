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

exports['Set: word: ERROR'] = function (test) {
  test.expect(1);
  root.set( 1, function ( err, res ) {
		test.ok( err );
		test.done();
	});
};

exports['Set: word: and'] = function (test) {
  test.expect(3);
			
	root.set( 'and', function ( err, res ) {
  	test.ifError( err );
  	test.strictEqual( res, 1 );
  	
  	expected.root.children['a'] = expected.a;
  	expected.a.children['n']    = expected.an;
  	expected.an.children['d']   = expected.and;
  	expected.and.isWord = true;
  	test.deepEqual( root, expected.root);
		test.done();
  });
};

exports['Set: word: an'] = function (test) {
  test.expect(3);
	root.set( 'an', function ( err, res ) {
  	test.ifError( err );
  	test.strictEqual( res, 1 );
    
  	expected.an.isWord = true;
  	test.deepEqual( root, expected.root );
  	test.done();
  });
};

exports['Del: word: and'] = function (test) {
	test.expect(1);
	root.del('and');
	delete expected.and;
	delete expected.an.children['d'];
	test.deepEqual(root, expected.root );
	test.done();
};
			
exports['Exists'] = function (test) {
	test.expect(3);
	root.set('Hello');
	test.strictEqual(false, root.exists('Hell')   );
	test.strictEqual(false, root.exists('Helloo') );
	test.strictEqual(true,  root.exists('Hello')  );
	test.done();
};

exports['Match'] = function (test) {
	test.expect(1);
	var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
	root.sets(words);
	test.deepEqual( root.match('a'), words.slice(1));
	test.done();
};
