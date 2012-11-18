var Autocomplete = require('../lib/autocomplete').Autocomplete;
var assert = require('assert');

var root = new Autocomplete();
var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
root.sets( words );

describe( 'match', function() {
  describe( ': Not a Prefix', function() {
    it( 'should error because this is not a prefix', function( done ) {
      root.match( 'f', function( err, res ) {
        assert.ok( err );
        done();	
      });
    });
  });
  describe( ': Is a Prefix', function() {
    it( 'should return the expected array of words', function( done ) {
      var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
      root.sets( words );
      root.match( 'a', function( err, res ) {
        assert.ifError( err );
        
        assert.deepEqual( res, words.slice(1) );
        done();	
      });
    });
  });
});

describe( 'score', function() {
  describe( ': Word Doesn\'t Exist', function() {
    it( 'Word should not exist', function( done ) {
      root.score( 'Sasd', function( err, score ) {
        assert.ok( err );
        done();
      });
    });
  });
  describe( 'Score: "and"', function() {
    it( 'should return 0', function( done ) {
      root.score( 'and', function( err, score ) {
        assert.ifError( err );
        
        assert.equal( 0, score );
        done();
      });
    });
  });
});

describe( 'inc', function() {
  describe( ': "and"', function() {
    it( 'should make score return 1', function( done ) {
      root.inc( 'and', function( err ) {
        assert.ifError( err );
        
        root.score( 'and', function( err, score ) {
          assert.ifError( err );
          
          assert.equal( 1, score );
          done();
        });
      });
    });
  });
});

describe( 'dec', function() {
  describe( ': "and"', function() {
    it( 'should make score return 0 again', function( done ) {
      root.dec( 'and', function( err ) {
        assert.ifError( err );
        
        root.score( 'and', function( err, score ) {
          assert.ifError( err );
          
          assert.equal( 0, score );
          done();
        });
      });
    });
  });
});
