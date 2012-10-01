var Trie = require('./trie').Trie;
var util = require('util');

function Autocomplete( name ) {
  this.super = Trie;
  this.super( name );
  delete this.super;
  this.count = 0;
};
util.inherits(Autocomplete, Trie);

Autocomplete.prototype._DFS = function( word ) {
  var word = word || '';
  var words = [];
  
  word += this._name;
  this._isWord && words.push( word );
  for ( var i in this._children )
     words = words.concat( this._children[i]._DFS( word ) );
  return words;
};

Autocomplete.prototype.match = function( word, cb ) {
  if ( !cb ) return;
  this._bottomNodeOfWord( word, function( err, child ) {
    var value = child && child._DFS( word.substr( 0, word.length-1 ) );
    cb( err, value );
  });
};

Autocomplete.prototype.score = function( word, cb ) {
  if ( !cb ) return;
  this._bottomNodeOfWord( word, function( err, child ) {
    var value = child && child.count;
    cb( err, value );
  });
};
exports.Autocomplete = Autocomplete;
