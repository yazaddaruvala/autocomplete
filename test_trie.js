var Trie = require('./trie').Trie;
var assert = require('assert');

// Test Create
var root = new Trie();
var expected = {
  root: { name: '' , isWord: false, children: {} },
  a   : { name: 'a', isWord: false, children: {} },
  an  : { name: 'n', isWord: false, children: {} },
  and : { name: 'd', isWord: false, children: {} }
}; 
assert.deepEqual( root, expected.root, "Failed root was not correctly initialized." );

// Test Add Word
root.set('and');
expected.root.children['a'] = expected.a;
expected.a.children['n']    = expected.an;
expected.an.children['d']   = expected.and;
expected.and.isWord = true;
assert.deepEqual(root, expected.root, "Failed root was not correctly modified by set('and').");

// Test Add Word, for a second word
root.set('an')
expected.an.isWord = true;
assert.deepEqual(root, expected.root, "Failed root was not correctly modified by set('an').");

// Test Remove Word
root.del('and');
delete expected.and;
delete expected.an.children['d'];
assert.deepEqual(root, expected.root, "Failed root was not correctly modified by del('and').");

root.set('Hello');
assert.strictEqual(false, root.exists('Hell'), "Non existing short word 'exists'" );
assert.strictEqual(false, root.exists('Helloo'), "Non existing long word 'exists'" );
assert.strictEqual(true, root.exists('Hello'), "Existing short word doesn't 'exists'" );

var words = [ 'b', 'a', 'an', 'and', 'andy', 'as', 'art'];
root.sets(words);
assert.deepEqual( root.match('a'), words.slice(1));
