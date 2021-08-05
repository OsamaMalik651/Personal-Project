var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;
var Bookings = require("../models/bookings").Bookings;
var Agents = require("../models/agents").Agents;
var Agency = require("../models/agencies").Agency;

router.get("/"),
  function (req, res, next) {
    const id = req.params.id;
    console.log(id);
    // res.redirect("/users/userProfile");
    res.redirect("/about");
  };
module.exports = router;
