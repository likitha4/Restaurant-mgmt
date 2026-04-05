const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Restaurants here are way too good to try, Why not give a chance?!");
});

module.exports = router;
