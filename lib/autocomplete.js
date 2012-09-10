var Trie = require('./trie').Trie;
var util = require('util');

var Autocomplete = function() {
  this.count = 0;
};
Autocomplete.prototype = new Trie();
Autocomplete.prototype.constructor = Autocomplete;

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
