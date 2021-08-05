var express = require("express");
var router = express.Router();
var Agents = require("../models/agents").Agents;
var Agency = require("../models/agencies").Agency;
var Contact = require("../models/contact").contactForm;

/* GET home page. */
router.get("/", async function (req, res, next) {
  var Role = "";
  const agency = await Agency.find().exec();
  const agents = await Agents.find({ role: "agent" }).exec();
  if (res.locals.currentUser) {
    Role = res.locals.currentUser.role;
  }

  if (Role === "agent" || Role === "manager") {
    res.render("contact", {
      Agents: agents,
      Agency: agency,
      role: Role,
    });
  } else
    res.render("contact", {
      Agents: agents,
      Agency: agency,
    });
});
router.post("/", function (req, res, next) {
  const contact = new Contact(req.body);
  contact.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("contact", {
        errors: errorArray,
      });
    }
    res.render("Thankyou", {
      name: contact.Name,
      message1: "contacting us",
      message2: "An agent will reach you shortly",
      login: true,
    });
  });
});

module.exports = router;
