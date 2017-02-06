var express = require('express');
// depend on router mudule to handle catch router info of request
var router = express.Router();
var http = require('http'); 

var add = require( '../add' );

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/routertest', function(req, res) {
	res.render('index', { title: 'Express is running'});
});

var calcObj = [];
var resultObj = [];


router.get('/hackthon-data', function (req, res){

	if (req.session) {
		req.session.visit ++;
	}else {
		req.session.visit = 0;
	}
	console.log(req.session.visit);

		

	var data = {
	  "data": [
	    {
	      "DT_RowId": "row_1",
	      "first_name": "Tiger",
	      "last_name": "Nixon",
	      "position": "System Architect",
	      "email": "t.nixon@datatables.net",
	      "office": "Edinburgh",
	      "extn": "5421",
	      "age": "61",
	      "salary": "320800",
	      "start_date": "2011-04-25"
	    },
	    {
	      "DT_RowId": "row_2",
	      "first_name": "Garrett",
	      "last_name": "Winters",
	      "position": "Accountant",
	      "email": "g.winters@datatables.net",
	      "office": "Tokyo",
	      "extn": "8422",
	      "age": "63",
	      "salary": "170750",
	      "start_date": "2011-07-25"
	    },
	    {
	      "DT_RowId": "row_3",
	      "first_name": "Ashton",
	      "last_name": "Cox",
	      "position": "Junior Technical Author",
	      "email": "a.cox@datatables.net",
	      "office": "San Francisco",
	      "extn": "1562",
	      "age": "66",
	      "salary": "86000",
	      "start_date": "2009-01-12"
	    },
	    {
	      "DT_RowId": "row_4",
	      "first_name": "Cedric",
	      "last_name": "Kelly",
	      "position": "Senior Javascript Developer",
	      "email": "c.kelly@datatables.net",
	      "office": "Edinburgh",
	      "extn": "6224",
	      "age": "22",
	      "salary": "433060",
	      "start_date": "2012-03-29"
	    },
	    {
	      "DT_RowId": "row_5",
	      "first_name": "Airi",
	      "last_name": "Satou",
	      "position": "Accountant",
	      "email": "a.satou@datatables.net",
	      "office": "Tokyo",
	      "extn": "5407",
	      "age": "33",
	      "salary": "162700",
	      "start_date": "2008-11-28"
	    },
	    {
	      "DT_RowId": "row_6",
	      "first_name": "Brielle",
	      "last_name": "Williamson",
	      "position": "Integration Specialist",
	      "email": "b.williamson@datatables.net",
	      "office": "New York",
	      "extn": "4804",
	      "age": "61",
	      "salary": "372000",
	      "start_date": "2012-12-02"
	    }],
	    
	    "options": [],
  		"files": []
	};

	res.json(data);
});

router.get('/matlab', function (req, res) {
	
	if ( req.param('ready') == 'true' ) {
		if( calcObj.length > 0 ){
			var data = calcObj.shift();

			res.json( data );
		}else{
			res.json( {tasktype:'none', num:3} );
		}


		if ( req.param('pathName') ) {
			var options = {
				host: add.matlab.host,
				port: add.matlab.port,
				path: req.param('pathName'),
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					}
			};


			var req = http.request(options, function(res) {
				var body = '';
				res.setEncoding( 'utf8');
				res.on('data', function (chunk) {
					body += chunk;
				});

				res.on( 'end', function() {
					var result = JSON.parse(body);
					console.log( result );
					resultObj.push( result );
				});
			});

			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			req.write('name=wb&host=ubuntu');
			req.end();


		}
	}
});

router.get('/client', function (req, res) {
	//console.log('is json? '+ req.is('json') );
	//console.log( req.params );
	//res.json({ name: 'wb' });
	
	var data = req.query;
	if ( 'data' == data.state ){
		// convert string form digit to real digti from the get request
		var data = JSON.stringify( req.query );
		data = data.replace(/"(\d+)"/g, "$1");
		data = JSON.parse( data );
		calcObj.push( data );

		//var result = JSON.parse( req.query );
		//console.log( result );
		res.jsonp({state: 'Server receive data'});

	} else if ( 'check' == data.state ){
		if ( resultObj.length > 0 ){
			var re = resultObj.shift();
			res.jsonp( re );
		}
		else{
			res.jsonp( {state: 'Empty results'} );
		}
	}
	
	/**
	if ( req.query ) {
		for ( var i in req.query ) {
			console.log( i + ' -> ' + req.query[i] );
			data[i] = req.query[i];
		}
	}
	**/
  

	/**
  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8');
  res.send( req.query.callback + '({"something": "rather", "more": "pork", "tua": "tara"});' ); 
	**/
	

	

});
// router module is exposed to the outside calling
module.exports = router;
