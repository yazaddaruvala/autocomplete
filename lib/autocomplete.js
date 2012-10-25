var Trie = require('./trie').Trie;
var util = require('util');

function Autocomplete( name ) {
  this.super = Trie;
  this.super( name );
  delete this.super;
  this.count = 0;
};
util.inherits( Autocomplete, Trie );

/**
* DFS is still sync
* I don't know yet if I should make it async.
*/
Autocomplete.prototype._DFS = function( word ) {
  var word = word || '';
  var words = [];
  
  word += this._name;
  this._isWord && words.push( word );
  for ( var i in this._children )
     words = words.concat( this._children[i]._DFS( word ) );
  return words;
};

/**
* param	cb		: Function( err, response )
*
* return response	:	Array[Autocomplete]	//Array[Nodes]
*/
Autocomplete.prototype.match = function( word, cb ) {
  if ( !cb ) return;
  this._bottomNodeOfWord( word, function( err, child ) {
    var value = child && child._DFS( word.substr( 0, word.length-1 ) );
    process.nextTick( function() {
      cb( err, value );
    });
  });
};

/**
* param word	:	String
* param	cb		: Function( err, response )
*
* return response	:	int
*/
Autocomplete.prototype.score = function( word, cb ) {
  if ( !cb ) return;
  this._bottomNodeOfWord( word, function( err, child ) {
    var value = child && child.count;
    process.nextTick( function() {
      cb( err, value );
    });
  });
};

Autocomplete.prototype._setCount = function( word, count, cb ) {
  this._bottomNodeOfWord( word, function( err, child ) {
    child.count += count;
    cb && process.nextTick( function() {
      cb( err );
    });
  });
};

/**
* param word	:	String
* param	cb		: Function( err, response )
*
* return
*/
Autocomplete.prototype.inc = function( word, cb ) {
  this._setCount( word, 1, cb );
};

/**
* param word	:	String
* param	cb		: Function( err, response )
*
* return
*/
Autocomplete.prototype.dec = function( word, cb ) {
  this._setCount( word, -1, cb );
};

exports.Autocomplete = Autocomplete;
