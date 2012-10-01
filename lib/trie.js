function Trie( name ) {
  this._name = name || '';
  this._isWord = false;
	this._children = {};
};

var isEmpty = function( ob ) {
  for ( var i in ob ) return false;
  return true;
};

Trie.prototype.set = function( word, cb ) {
  if ( typeof( word ) !== 'string' ) {
    return cb && process.nextTick( function() {
      cb ( new Error('Argument was not a string') );
    });
  }
  if ( word === '' ) {
    if ( this._name !== '' ) this._isWord = true;
    cb && cb();
  } else {
    this._children[ word[0] ] = this._children[ word[0] ] || new this.constructor( word[0] );
    this._children[ word[0] ].set( word.substr(1), cb );
  }
};

Trie.prototype.del = function( word, cb ) {
  if ( typeof( word ) !== 'string' ) {
    return cb && process.nextTick( function() {
      cb( new Error('Argument was not a string') );
    });
  }
  // This can only be true for the root and word === '';
  if ( this._name === word ) return;
  
  // If we are at the end of the word. Mark it as not a word.
  if ( word === '' ) this._isWord = false;
  // Check for a child.
	if ( !this._children[ word[0] ] ) return;
	// Recursive call to delete all children.
	this._children[ word[0] ].del( word.substr(1) );
	// After possibly deleting grandchild, check if we can delete child.
	if ( !this._children[ word[0] ]._isWord && isEmpty( this._children[ word[0] ]._children ) ) {
	  delete this._children[ word[0] ];
	}
	
	// If we have gotten back to the root. Callback.
	this._name === '' && cb && process.nextTick( cb );
};

Trie.prototype.empty = function( cb ) {
  this._children = [];
  cb && process.nextTick( cb );
};

Trie.prototype.sets = function( words, cb ) {
  if ( !Array.isArray( words ) ) {
    return cb && process.nextTick( function() {
      cb( new Error('Input is not an array') );
    });
  }
  for ( var i = 0; i < words.length; i++ ) this.set( words[i] );
  cb && process.nextTick( cb );
};

/**
* Not sure yet if this should be async
*/
Trie.prototype._bottomNodeOfWord = function( word, cb ) {
  if ( !cb ) return;
  if ( typeof( word ) !== 'string' ) {
    return process.nextTick( function() {
      cb ( new Error('Argument was not a string') );
    });
  }
  var child = this;
  for ( var i = 0; i < word.length; i++ ) {
    if ( !child._children[ word[i] ] ) {
      return process.nextTick( function() {
        cb( new Error('Word doesn\'t exist') );
      });
    }
    child = child._children[word[i]];
  }
  process.nextTick( function() {
    cb( undefined, child );
  });
};

Trie.prototype.exists = function( word, cb ) {
  if ( !cb ) return;
  this._bottomNodeOfWord( word, function( err, child ) {
    var value = ( child && child._isWord ) || false;
    process.nextTick( function() {
      cb( err, value );
    });
  });
};

exports.Trie = Trie;