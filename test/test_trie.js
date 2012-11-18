var Trie = require('../lib/trie').Trie;
var assert = require('assert');

var root = new Trie();
var expected = {
  root: { _name: '' , _isWord: false, _children: {} },
  a   : { _name: 'a', _isWord: false, _children: {} },
  an  : { _name: 'n', _isWord: false, _children: {} },
  and : { _name: 'd', _isWord: false, _children: {} }
};

describe( 'Root Creation', function() {
  it( 'should return a the expected Trie when initialized', function( done ) {
    assert.deepEqual( root, expected.root );
    done();
  });
});

describe( 'set', function() {
  describe( ': "and"', function() {
    it( 'Root should change to have "and" in it', function( done ) {
      root.set( 'and', function ( err ) {
        assert.ifError( err );
        expected.root._children['a'] = expected.a;
        expected.a._children['n']    = expected.an;
        expected.an._children['d']   = expected.and;
        expected.and._isWord = true;
        assert.deepEqual( root, expected.root);
        done();
      });
    });
  });
  describe( ': "an"', function() {
    it( 'Root should change to have "an" in it', function( done ) {
      root.set( 'an', function ( err ) {
        assert.ifError( err );
        expected.an._isWord = true;
        assert.deepEqual( root, expected.root );
        done();
      });
    });
  });
});

describe( 'del', function() {
  describe( ': "and"', function() {
    it( 'Root should no longer have "and" in it', function( done ) {
      root.del( 'and', function ( err, res ) {
        assert.ifError( err );
        delete expected.and;
        delete expected.an._children['d'];
        assert.deepEqual( root, expected.root );
        done();
      });
    });
  });
  describe( ': "and" again', function() {
    it( 'Root should no longer have "and" in it', function( done ) {
      root.del( 'and', function ( err, res ) {
        assert.ifError( err );
        delete expected.and;
        delete expected.an._children['d'];
        assert.deepEqual( root, expected.root );
        done();
      });
    });
  });
});

describe( 'Empty', function() {
  describe( 'isEmpty: Not empty', function() {
    it( 'should not be empty', function( done ) {
      root.isEmpty( function( err, value ) {
        assert.strictEqual( value, false );
        done();
      });
    });
  });
  describe( 'empty', function() {
    it( 'Root should be empty', function( done ) {
      root.empty( function() {
        assert.deepEqual( root, new Trie() );
        done();
      });
    });
  });
  describe( 'isEmpty: Empty', function() {
    it( 'should be empty', function( done ) {
      root.isEmpty( function( err, value ) {
        assert.strictEqual( value, true );
        done();
      });
    });
  });
});

describe( 'sets: [ "an" ]', function() {
  it( 'Root should now contain these words', function( done ) {
    root.sets( [ 'an' ], function() {
      assert.deepEqual( root, expected.root );
      done();
    });
  });
});

//These tests should fail if 'set' and 'sets' were actually async
describe( 'Exists', function() {
  describe( ': "Hell"', function() {
    it( 'should not exist', function( done ) {
      root.set( 'Hello', function() {
        //console.log( "Hello is set" );
      });
      root.exists( 'Hell', function( err, res ) {
        assert.strictEqual( false, res );
        done();
      });
    });
  });
  describe( ': "Helloo"', function() {
    it( 'should not exist', function( done ) {
      root.exists('Helloo', function( err, res ) {
        assert.strictEqual( false, res );
        done();
      });
    });
  });
  describe( ': "Hello"', function() {
    it( 'should exist', function( done ) {
      root.exists('Hello', function( err, res ) {
        assert.strictEqual( true, res );
        done();
      });
    });
  });
});
