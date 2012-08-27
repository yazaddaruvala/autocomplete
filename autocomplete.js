var query = 'a';
var words = ['a', 'b', 'and', 'an', 'as', 'ant', 'andy', 'art'];

var Trie = function(name, isWord) {
  this.name = name || '';
  this.isWord = false;
	this.children = [];
};

root = new Trie();
var isEmpty = function(ob) {
  for(var i in ob){ return false; }
  return true;
}
// Test Create
console.log("Create Test:", '\t\t\t\t', typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && isEmpty(root.children));
if (!(typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && isEmpty(root.children))) process.exit();

Trie.prototype.addWord = function(word) {
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
  child.addWord(word.substr(1));
};

Trie.prototype.removeWord = function(word) {
  if ( typeof(word) !== 'string' ) {
    console.log('Word', word, 'could not be added it was not a string');
    return;
  }
  if (word === '') {
    if (this.name === '') return;
    this.isWord = false;
  } else {
    if (this.children[word[0]].removeWord(word.substr(1)))
      delete this.children[word[0]];
  }
  return !this.isWord && isEmpty(this.children);
};

// Test Add Word
root.addWord('and')
var test_root = typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && !isEmpty(root.children);
var test = root.children['a'];
var test_a = typeof(test) !== 'undefined' && test.name === 'a' && test.isWord === false && !isEmpty(test.children);
test = test.children['n'];
var test_an = typeof(test) !== 'undefined' && test.name === 'n' && test.isWord === false && !isEmpty(test.children);
test = test.children['d'];
var test_and = typeof(test) !== 'undefined' && test.name === 'd' && test.isWord === true && isEmpty(test.children);
console.log("Add Word:", '\t\t\t\t', test_root && test_a && test_an && test_and);
if (!(test_root && test_a && test_an && test_and)) process.exit();

// Test Add Word for a second word
root.addWord('an')
test_root = typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && !isEmpty(root.children);
test = root.children['a'];
test_a = typeof(test) !== 'undefined' && test.name === 'a' && test.isWord === false && !isEmpty(test.children);
test = test.children['n'];
test_an = typeof(test) !== 'undefined' && test.name === 'n' && test.isWord === true && !isEmpty(test.children);
test = test.children['d'];
test_and = typeof(test) !== 'undefined' && test.name === 'd' && test.isWord === true && isEmpty(test.children);
console.log("Add Second Word:", '\t\t\t', test_root && test_a && test_an && test_and);
if (!(test_root && test_a && test_an && test_and)) process.exit();

// Test Remove Word
root.removeWord('and');
test_root = typeof(root) !== 'undefined' && root.name === ''  && root.isWord === false && !isEmpty(root.children);
test = root.children['a'];
test_a    = typeof(test) !== 'undefined' && test.name === 'a' && test.isWord === false && !isEmpty(test.children);
test = test.children['n'];
test_an   = typeof(test) !== 'undefined' && test.name === 'n' && test.isWord === true  &&  isEmpty(test.children);
test = test.children['d'];
test_and  = typeof(test) === 'undefined';
console.log("Remove Word:", '\t\t\t\t', test_root && test_a && test_an && test_and);
if (!(test_root && test_a && test_an && test_and)) process.exit();
