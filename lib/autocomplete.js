var Trie = require('./trie').Trie;
var util = require('util');

function Autocomplete( name ) {
  this.super = Trie;
  this.super( name );
  delete this.super;
  
  this.count = 0;
};
Autocomplete.prototype = new Trie();
Autocomplete.prototype.constructor = Autocomplete;

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
  if ( typeof( word ) !== 'string' ) {
    cb ( new Error('Argument was not a string') );
    return;
  }
  //DFS to return all possible words that match a prefix
  var child;
  try { child = this._bottomNodeOfWord( word ); }
  catch ( e ) { cb( e ); return; }

	cb( undefined, child._DFS( word.substr( 0, word.length-1 ) ) );
};

exports.Autocomplete = Autocomplete;
