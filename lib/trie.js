var Trie = function( name ) {
  this.name = name || '';
  this.isWord = false;
	this.children = {};
};

var isEmpty = function( ob ) {
  for ( var i in ob ) return false;
  return true;
};

Trie.prototype.set = function( word, cb ) {
  if ( typeof( word ) !== 'string' ) {
    cb && cb ( new Error('Argument was not a string') );
    return;
  }
  if ( word === '' ) {
    if ( this.name !== '' ) this.isWord = true;
    cb && cb();
  } else {
    this.children[ word[0] ] = this.children[ word[0] ] || new Trie( word[0] );
    this.children[ word[0] ].set( word.substr(1), cb );
  }
};

Trie.prototype.del = function( word, cb ) {
  if ( typeof( word ) !== 'string' ) {
    cb && cb ( new Error('Argument was not a string') );
    return;
  }
  // This can only be true for the root and word === '';
  if ( this.name === word ) return;
  
  // If we are at the end of the word. Mark it as not a word.
  if ( word === '' ) this.isWord = false;
  // Check for a child.
	if ( !this.children[ word[0] ] ) return;
	// Recursive call to delete all children.
	this.children[ word[0] ].del( word.substr(1) );
	// After possibly deleting grandchild, check if we can delete child.
	if ( !this.children[ word[0] ].isWord && isEmpty( this.children[ word[0] ].children ) ) {
	  delete this.children[ word[0] ];
	}
	
	// If we have gotten back to the root. Callback.
	this.name === '' && cb && cb();
};

Trie.prototype.empty = function( cb ) {
  this.children = [];
  cb && cb();
};

Trie.prototype.sets = function( words, cb ) {
  if ( !Array.isArray( words ) ) {
    cb && cb( new Error('Input is not an array') );
    return;
  }
  for ( var i = 0; i < words.length; i++ ) this.set( words[i] );
  cb && cb();
};

Trie.prototype._bottomNodeOfWord = function( word ) {
  var child = this;
  for ( var i = 0; i < word.length; i++ ) {
    if ( !child.children[ word[i] ] ) { throw new Error('Word doesn\'t exist'); }
    child = child.children[word[i]];
  }
  return child;
};

Trie.prototype.exists = function( word, cb ) {
  if ( !cb ) return;
  if ( typeof( word ) !== 'string' ) {
    cb ( new Error('Argument was not a string') );
    return;
  }
  try { cb( undefined, this._bottomNodeOfWord( word ).isWord ); }
  catch (e) { cb( undefined, false ); }
};

Trie.prototype._DFS = function( word ) {
  var word = word || '';
  var words = [];
  
  word += this.name;
  this.isWord && words.push( word );
  for ( var i in this.children )
     words = words.concat( this.children[i]._DFS( word ) );
  return words;
};

Trie.prototype.match = function( word, cb ) {
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

exports.Trie = Trie;