var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var myDB = require('./myDB');
//var mgdb = require('./mgDB');
var events = require( 'events' );

/**register event on 'ready' evnets of data**/
var dataEvents = new events.EventEmitter();
dataEvents.on( 'ready', getData );

/**process the data got from database query results**/
function getData( d ) {
	if ( 'query_all_users' == d.action ){
		console.log ( d.data );
	}
	return d;
}

/**init a object of mysql**/
var mydb = new myDB( 1 );

console.log( myName );

app = express();
app.use( bodyParser() );
app.use( cookieParser() );
app.use( session( {secret: 'my secret'} ) );

app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render( 'index', { authenticated: false } );
});

app.get( '/login', function(req, res) {
	res.render('login');
});

app.get( '/signup', function(req, res) {
	res.render('signup');
});

mydb.exec( 'SELECT * FROM user_info', dataEvents, 'query_all_users' );
var ms = mydb.identify();
//console.log(ms);

//app.listen(3001);
