function DB( type, options ) {
	this.type = type;
	this.options = options;
	this. qureyStr = '';
}

DB.prototype = {
	constructor: DB,

	writeInput: function ( input ) {
	
	},

	readOutput: function() {
	
	},

	init: function() {
		switch ( this.type ) {
			case 'mongodb':

				break;
			case 'mysql':

				break;
			case 'redis':

				break;
			default:

				break;
		}
	}

	close: function() {
		switch ( this.type ) {
			case 'mongodb':

				break;
			case 'mysql':

				break;
			case 'redis':

				break;
			default:
				break;
		}
	}

}



