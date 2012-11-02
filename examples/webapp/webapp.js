var express = require( 'express' );
var app = express();
app.listen( 3000 );

var Autocomplete = require( __dirname + '/../../lib/autocomplete' ).Autocomplete;
var ac = new Autocomplete();

//Data from jQueryUI's Autocomplete examples
ac.sets([
  'ActionScript',
  'AppleScript',
  'Asp',
  'BASIC',
  'C',
  'C++',
  'Clojure',
  'COBOL',
  'ColdFusion',
  'Erlang',
  'Fortran',
  'Groovy',
  'Haskell',
  'Java',
  'JavaScript',
  'Lisp',
  'Perl',
  'PHP',
  'Python',
  'Ruby',
  'Scala',
  'Scheme'
]);

app.get( '/suggestions.json', function( req, res ) {
  ac.match( req.query.term, function( err, result ) {
    if ( err ) return res.end();
	res.json( result );
  });
});

app.get( '/search', function( req, res ) {
  res.send( 'You searched for: ' + req.query.q );
});

app.get( '/', function( req, res ) {
  res.sendfile( __dirname + '/webapp.html' );
});
