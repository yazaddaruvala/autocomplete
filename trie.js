var Trie = function(name, isWord) {
  this.name = name || '';
  this.isWord = false;
	this.children = [];
};

var isEmpty = function(ob) {
  for(var i in ob){ return false; }
  return true;
};

Trie.prototype.set = function(word) {
  if ( typeof(word) !== 'string' ) {
    console.log('Word', word, 'could not be added it was not a string');
    return;
  }
  if (word === '') {
    if (this.name !== '')
      this.isWord = true;
    return;
  }  
  var child = this.children[word[0]] = this.children[word[0]] || new Trie(word[0]);
  child.set(word.substr(1));
};

Trie.prototype.del = function(word) {
  if ( typeof(word) !== 'string' ) {
    console.log('Word', word, 'could not be added it was not a string');
    return;
  }
  if (word === '') {
    if (this.name === '') return;
    this.isWord = false;
  } else {
    if (this.children[word[0]].del(word.substr(1)))
      delete this.children[word[0]];
  }
  return !this.isWord && isEmpty(this.children);
};

Trie.prototype.sets = function(wordList) {
  if ( typeof(wordList) !== 'array' ) {
    console.log('WordList', wordList, 'was not an array');
    return;
  }
  for (var i = 0; i < wordList.length; i++)
    this.set(wordList[i]);
};

Trie.prototype.exists = function(word) {
  var child = this;
  for (var i = 0; i < word.length; i++) {
    if (typeof(child.children[word[i]]) === 'undefined') return false;
    child = child.children[word[i]];
  }
  return child.isWord;
};

exports.Trie = Trie;