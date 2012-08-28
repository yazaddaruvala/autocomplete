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

Trie.prototype.sets = function(words) {
  if ( !Array.isArray(words) ) {
    console.log('Words', words, 'were not in an array');
    return;
  }
  for (var i = 0; i < words.length; i++)
    this.set(words[i]);
};

Trie.prototype.__bottomNodeOfWord = function(word) {
  var child = this;
  for (var i = 0; i < word.length; i++) {
    if (typeof(child.children[word[i]]) === 'undefined') throw new Error('Word doesn\'t exist');
    child = child.children[word[i]];
  }
  return child;
};

Trie.prototype.exists = function(word) {
  try { return this.__bottomNodeOfWord(word).isWord; }
  catch (e) { return false; }
};

Trie.prototype.__DFS = function(word) {
  var word = word || '';
  var words = [];
  
  word += this.name;
  if (this.isWord) words.push(word);
  for ( var i in this.children )
     words = words.concat(this.children[i].__DFS(word));
  return words;
};

Trie.prototype.match = function(word) {
  //DFS to return all possible words that match a prefix
  var child;
  try { child = this.__bottomNodeOfWord(word); }
  catch (e) { console.log(e); return; }

	return child.__DFS(word.substr(0,word.length-1));
};

exports.Trie = Trie;