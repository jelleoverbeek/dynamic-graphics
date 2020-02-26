var express = require("express");
var app = express();
var path = require("path");
// var router = express.Router();
var calendar = require("./calendar.js");

app.get("/calendar/:month/:day", function(req, res, next) {
  res.setHeader("Content-Type", "image/png");
  calendar(req.params.month, req.params.day).pipe(res);
});

// viewed at http://localhost:8080
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(8080);
