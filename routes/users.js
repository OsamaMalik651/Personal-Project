var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;
var Bookings = require("../models/bookings").Bookings;
var Agents = require("../models/agents").Agents;
var Agency = require("../models/agencies").Agency;
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//middleware that is specific to this router,
//Checks that the user must be logged in
//to be added to every router file if user sign is necessary there.
//all the routes above will not require user to be login to be displayed

router.use((req, res, next) => {
  if (!req.user) res.status(403).redirect("/");
  else next();
});

router.get("/userProfile", async function (req, res, next) {
  var trips = await Bookings.find({
    customerId: res.locals.currentUser._id,
  }).exec();
  //var package = await Packages.findOne({ PackageId: trips.PackageId }).exec();
  const role = res.locals.currentUser.role;
  if (role === "customer") {
    res.render("userProfile", { title: "Customer", trips: trips });
  } else if (role === "agent" || role === "manager") {
    res.render("agentProfile", { title: "Agent Profile", role: role });
  }
});
router.get("/userProfile/updatePackage", function (req, res, next) {
  res.render("UserPackageUpdate", { title: "Update Package" });
});
router.post("/userProfile/Agency/:id", async function (req, res, next) {
  var newAgency = new Agency(req.body);
  await Agency.findByIdAndUpdate(
    parseInt(req.params.id),
    {
      AgncyAddress: newAgency.AgncyAddress,
      AgncyCity: newAgency.AgncyCity,
      AgncyProv: newAgency.AgncyProv,
      AgncyPostal: newAgency.AgncyPostal,
      AgncyCountry: newAgency.AgncyCountry,
      AgncyPhone: newAgency.AgncyPhone,
      AgncyFax: newAgency.AgncyFax,
    },
    { new: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      console.log(doc);
      res.redirect("/users/userProfile");
    }
  );
});
router.post("/userProfile/Agent/:id", async function (req, res, next) {
  const newAgent = new Agents(req.body);
  const agent = await Agents.findOne(
    {
      _id: req.params.id,
    },
    function (err, result) {
      if (err) console.log(err);
      return result;
    }
  );
  agent.username = newAgent.username;
  agent.AgtEmail = newAgent.AgtEmail;
  agent.AgtFirstName = newAgent.AgtFirstName;
  agent.AgtLastName = newAgent.AgtLastName;
  agent.AgtBusPhone = newAgent.AgtBusPhone;
  agent.AgencyId = newAgent.AgencyId;
  agent.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("package-create", {
        errors: errorArray,
      });
    }
    res.redirect("/users/userProfile");
  });
});

router.get("/userProfile/:Agencyid", async function (req, res, next) {
  var page = req.params.Agencyid;
  if (page === "Agency") {
    const agency = await Agency.find().exec();
    res.render("contactDetailsUpdate", {
      title: "Agency Details Update Page",
      Agency: agency,
      showAgency: true,
    });
  } else if (page === "Agent") {
    console.log(res.locals.currentUser._id);
    const agent = await Agents.findOne(
      {
        _id: res.locals.currentUser._id,
      },
      function (err, result) {
        if (err) console.log(err);
        return result;
      }
    );
    res.render("contactDetailsUpdate", {
      title: "Agent Details Update Page",
      showAgent: true,
      Agent: agent,
    });
  }
});

module.exports = router;
