var express = require("express");
var router = express.Router();
var Packages = require("../models/package").Packages;

/* GET home page. */

router.get("/create", function (req, res, next) {
  Packages.find((err, packages) => {
    res.render("package-create");
  });
});
//intially not bound to user login requirement to enter the Package.
//will be restricted to agent only
// router.post("/updateDetails/:id"),
//   function (req, res, next) {
//     console.log(req.params.id);
//     res.redirect("/account");
//   };

router.post("/create", function (req, res, next) {
  const package = new Packages(req.body);
  package.id = req.body.id;
  package.imgsrc = req.body.imgsrc;
  package.imgtitle = req.body.imgtitle;
  package.pagesource = req.body.pagesource;
  package.packagedetail = req.body.packagedetail;
  package.save((err) => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
      return res.render("package-create", {
        errors: errorArray,
      });
    }
    res.redirect("/");
  });
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/", function (req, res, next) {
  Packages.find((err, packages) => {
    res.render("index", {
      Packages: packages,
    });
  });
});
module.exports = router;
