var assert = require("assert");
var request = require("request");

describe("Server testing suite", function() {
  it("test if localhost is running", function(done) {
    request("http://localhost:3000", function(error, response, body) {
      assert.equal(error, null);
      assert.equal(response.statusCode, 200);
      done();
    });
  });
});

describe("db testing suite", function() {
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb://localhost:27017";
  var client;

  it("should connect to database", function(done) {
    MongoClient.connect(url, function(err, cl) {
      assert.equal(null, err);
      client = cl;
      done();
    });
  });

  it("should be able to insert data", function(done) {
    var db = client.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    db.collection("customers").insertOne(myobj, function(err, res) {
      assert.equal(null, err);
      done();
    });
  });

  it("should be able to find data", function(done) {
    var db = client.db("mydb");
    db
      .collection("customers")
      .findOne({ name: "Company Inc" }, function(err, result) {
        assert.equal(null, err);
        assert.equal(result.address, "Highway 37");
        done();
      });
  });
});
