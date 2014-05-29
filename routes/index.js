var express = require('express');
var router = express.Router();
var http = require('http'); 

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/routertest', function(req, res) {
	res.render('index', { title: 'Express is running'});
});

router.get('/matlab', function (req, res) {
	
	if ( req.param('ready') == 'true' ) {
		var data = {
			timestamp: 1001001,
			data: [1, 2, 3, 4, 5]
		};

		res.json(data);

		if ( req.param('path') ) {
			var options = {
				host: '192.168.1.109',
				port: '80',
				path: req.param('path'),
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': postdata.length
					}
			};

			var req = http.request(options, function(res) {
				console.log(res);
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
	
	var data = {};

	if ( req.query ) {
		for ( var i in req.query ) {
			console.log( i + ' -> ' + req.query[i] );
			data[i] = req.query[i];
		}
	}
	console.log("req.params");
  console.log( req.params );
  
	res.jsonp( data );

	/**
  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8');
  res.send( req.query.callback + '({"something": "rather", "more": "pork", "tua": "tara"});' ); 
	**/
	

	

});

module.exports = router;
