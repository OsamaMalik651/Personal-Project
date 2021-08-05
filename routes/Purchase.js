var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;
var Bookings = require("../models/bookings").Bookings;
var packageCost = {
  title: " ",
  basePrice: 0,
  commision: 0,
  travellerCount: 0,
  totalPrice: 0,
  Id: 0,
  startDate: Date(),
};

//middleware that is specific to this router,
//Checks that the user must be logged in
//to be added to every router file if user sign is necessary there.
//all the routes above will not require user to be login to be displayed
router.use((req, res, next) => {
  if (!req.user) res.status(403).redirect("/");
  else next();
});
router.get("/purchaseDone", function (req, res, next) {
  const booking = new Bookings();
  console.log(packageCost);
  booking.PackageId = packageCost.Id;
  booking.customerId = res.locals.currentUser._id;
  booking.totalPrice = packageCost.totalPrice;
  booking.travellerCount = packageCost.travellerCount;
  booking.title = packageCost.title;
  booking.PkgStartDate = packageCost.startDate;
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
  console.log(packageCost);
  packageCost.travellerCount = req.body.travellerCount;
  packageCost.totalPrice =
    packageCost.basePrice * packageCost.travellerCount + packageCost.commision;
  res.redirect("/purchasePage/purchaseConfirm");
});
router.get("/purchaseConfirm", function (req, res, next) {
  res.render("purchaseConfirm", {
    title: "Purchase Confirmation Page",
    cost: packageCost,
  });
});

router.get("/:id", async function (req, res, next) {
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
    });
  });
});

module.exports = router;
