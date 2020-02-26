var express = require("express");
var router = express.Router();
var calendar = require("./calendar.js");

router.get("/calendar", function(req, res, next) {
  res.setHeader("Content-Type", "image/png");
  calendar()
    .pngStream()
    .pipe(res);
});

module.exports = router;
