var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;

var packageswd = [];
//Get Package Page
router.get("/", async function (req, res, next) {
  packageswd = await Packages.find().exec();
  res.render("Packages", {
    Packages: packageswd,
  });
});

//Get Package detail page with specific id to render the complete detail page.
router.get("/details/:pkdId", async function (req, res, next) {
  Packages.findOne({ PackageId: req.params.pkdId }, function (err, result) {
    if (err) {
      console.log(err);
    }
    res.render("packageDetail", {
      title: "Package detail Page",
      packageDetail: result,
    });
  });
});

module.exports = router;
