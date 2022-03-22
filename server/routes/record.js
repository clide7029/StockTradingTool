const express = require("express");
const fetch = require("node-fetch");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("stockData");
  db_connect
    .collection("stock")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb("stockData");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("stock")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/record/name/:name").get(function (req, res) {
    let db_connect = dbo.getDb("stockData");
    let myquery = { description: req.params.name };
    db_connect
        .collection("stock")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

recordRoutes.route("//user/:username&:password").get(function (req, res) {
    let db_connect = dbo.getDb("stockData");
    let myquery = { username: req.params.username,  Password: req.params.Password};
    db_connect
        .collection("User")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

recordRoutes.route("/record/price/:name").get(function (req, res) {
    let db_connect = dbo.getDb("stockData");
    let myquery = { description: req.params.name };
    db_connect
        .collection("stock")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          var url = 'https://finnhub.io/api/v1/quote?symbol='+ result.symbol +'&token=c84b3jqad3ide9hei860';
          fetch(url)
          .then(data => {
            return data.json();
            })
            .then(post => {
              res.json(post);
              });
        });
  });

  recordRoutes.route("/record/prices/:name&:span&:T1&:T2").get(function (req, res) {
    let db_connect = dbo.getDb("stockData");
    let myquery = { description: req.params.name };
    //var datum = Date.parse(req.params.T1);
    //var UNIXDate = datum/1000;
    //var datum2 = Date.parse(req.params.T2);
    //var UNIXDate2 = datum2/1000;
    db_connect
        .collection("stock")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          var url = 'https://finnhub.io/api/v1/stock/candle?symbol='+result.symbol+'&resolution='+req.params.span+'&from='+req.params.T1+'&to='+req.params.T2+'&token=c84b3jqad3ide9hei860';
          fetch(url)
          .then(data => {
            return data.json();
            })
            .then(post => {
              res.json(post);
              });
        });
  });

module.exports = recordRoutes;
