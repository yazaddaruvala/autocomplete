var Trie = require('./trie').Trie;

var isEmpty = function(ob) {
  for(var i in ob){ return false; }
  return true;
}

var root = new Trie();
// Test Create
console.log("Create:", '\t\t\t\t', typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && isEmpty(root.children));
if (!(typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && isEmpty(root.children))) process.exit();

// Test Add Word
root.set('and')
var test_root = typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && !isEmpty(root.children);
var test = root.children['a'];
var test_a = typeof(test) !== 'undefined' && test.name === 'a' && test.isWord === false && !isEmpty(test.children);
test = test.children['n'];
var test_an = typeof(test) !== 'undefined' && test.name === 'n' && test.isWord === false && !isEmpty(test.children);
test = test.children['d'];
var test_and = typeof(test) !== 'undefined' && test.name === 'd' && test.isWord === true && isEmpty(test.children);
console.log("Set:", '\t\t\t\t\t', test_root && test_a && test_an && test_and);
if (!(test_root && test_a && test_an && test_and)) process.exit();

// Test Add Word for a second word
root.set('an')
test_root = typeof(root) !== 'undefined' && root.name === '' && root.isWord === false && !isEmpty(root.children);
test = root.children['a'];
test_a = typeof(test) !== 'undefined' && test.name === 'a' && test.isWord === false && !isEmpty(test.children);
test = test.children['n'];
test_an = typeof(test) !== 'undefined' && test.name === 'n' && test.isWord === true && !isEmpty(test.children);
test = test.children['d'];
test_and = typeof(test) !== 'undefined' && test.name === 'd' && test.isWord === true && isEmpty(test.children);
console.log("Set (second word):", '\t\t\t', test_root && test_a && test_an && test_and);
if (!(test_root && test_a && test_an && test_and)) process.exit();

// Test Remove Word
root.del('and');
test_root = typeof(root) !== 'undefined' && root.name === ''  && root.isWord === false && !isEmpty(root.children);
test = root.children['a'];
test_a    = typeof(test) !== 'undefined' && test.name === 'a' && test.isWord === false && !isEmpty(test.children);
test = test.children['n'];
test_an   = typeof(test) !== 'undefined' && test.name === 'n' && test.isWord === true  &&  isEmpty(test.children);
test = test.children['d'];
test_and  = typeof(test) === 'undefined';
console.log("Del:", '\t\t\t\t\t', test_root && test_a && test_an && test_and);
if (!(test_root && test_a && test_an && test_and)) process.exit();

root.set('Hello');
var non_existing_short = root.exists('Hell') === false;
var non_existing_long = root.exists('Helloo') === false;
var existing = root.exists('Hello')  ===  true;
console.log("Exists (non-existing word short):", '\t', non_existing_short);
console.log("Exists (non-existing word long):", '\t', non_existing_long);
console.log("Exists (existing word):", '\t\t', existing);
if (!(non_existing_short && non_existing_long && existing)) process.exit();

