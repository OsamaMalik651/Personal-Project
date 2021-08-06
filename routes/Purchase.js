var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;
var Bookings = require("../models/bookings").Bookings;
var Agents = require("../models/agents").Agents;
var AgentCommission = require("../models/agentcommission").AgentCommission;
var packageCost = {
  title: " ",
  basePrice: 0,
  commision: 0,
  travellerCount: 0,
  totalPrice: 0,
  Id: 0,
  startDate: Date(),
  AgentId: 0,
};

//middleware that is specific to this router,
//Checks that the user must be logged in
//to be added to every router file if user sign is necessary there.
//all the routes above will not require user to be login to be displayed
router.use((req, res, next) => {
  if (!req.user) res.status(403).redirect("/");
  else next();
});
router.get("/purchaseDone", async function (req, res, next) {
  var agentcommission = new AgentCommission();
  agentcommission.AgentId = packageCost.AgentId;
  agentcommission.AgentCommission.push(packageCost.commision * 0.1);
  await agentcommission.save();
  const booking = new Bookings();
  booking.PackageId = packageCost.Id;
  booking.customerId = res.locals.currentUser._id;
  booking.totalPrice = packageCost.totalPrice;
  booking.travellerCount = packageCost.travellerCount;
  booking.title = packageCost.title;
  booking.PkgStartDate = packageCost.startDate;
  booking.AgentId = packageCost.AgentId;
  booking.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("purchaseDone", {
        errors: errorArray,
      });
    }
    res.render("purchaseDone");
  });
});
router.post("/purchaseConfirm/:id", function (req, res, next) {
  packageCost.Id = req.params.id;
  packageCost.travellerCount = req.body.travellerCount;
  packageCost.totalPrice =
    packageCost.basePrice * packageCost.travellerCount + packageCost.commision;
  packageCost.AgentId = req.body.AgentId;
  console.log(packageCost);
  res.redirect("/purchasePage/purchaseConfirm");
});
router.get("/purchaseConfirm", function (req, res, next) {
  res.render("purchaseConfirm", {
    title: "Purchase Confirmation Page",
    cost: packageCost,
  });
});

router.get("/:id", async function (req, res, next) {
  const agent = await Agents.find({ role: "agent" }).exec();
  Packages.findOne({ PackageId: req.params.id }, function (err, result) {
    console.log(err, result);
    if (err) {
      console.log(err);
    }
    packageCost.title = result.PkgName;
    packageCost.basePrice = result.PkgBasePrice;
    packageCost.commision = result.PkgAgencyCommission;
    packageCost.startDate = result.PkgStartDate;

    console.log(packageCost);
    res.render("purchasePage", {
      title: "Purchase Page",
      packageDetail: result,
      Agents: agent,
    });
  });
});

module.exports = router;
