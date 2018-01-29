var assert = require('assert');
var request = require('request');

describe('testing suite', function() {

	it('adding 6 and 2', function() {
		var two = 2;
		var six = 6;
		var result = two + six;
		assert.equal(8, result);
	});

	it('test if localhost is running', function(done) {
		request('http://localhost:3000', function (error, response, body) {
			assert.equal(error, null);
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});

describe('db testing suite', function() {
	
	const MongoClient = require('mongodb').MongoClient;
	const url = 'mongodb://localhost:27017';

	it('should connect to database', function() {
		MongoClient.connect(url, function(err, client) {
			assert.equal(null, err);	
		});
	});

	it('should be able to insert data', function() {
		MongoClient.connect(url, function(err, client) {
					
			var dbo = client.db("mydb");
			var myobj = { name: "Company Inc", address: "Highway 37" };
			dbo.collection("customers").insertOne(myobj, function(err, res) {
			assert.equal(null, error);	
			console.log("1 document inserted");			
			});
		}); 
	});

	it('should be able to find data', function() {
		MongoClient.connect(url, function(err, client) {					
			if (err) throw err;
			var dbo = db.db("mydb");
			dbo.collection("customers").findOne({}, function(err, result) {
				console.log(result.name);	
				assert.equal(null, error);							
			});
		}); 	
	});  
});