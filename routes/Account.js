var express = require("express");
var router = express.Router();
const User = require("../models/user").User;
const bcrypt = require("bcryptjs");

const accountPage = {
  title: "Accounts Page",
  Login: false,
};

/* GET home page. */
router.get("/", function (req, res, next) {
  accountPage.Login = true;
  res.render("accounts", accountPage);
});

router.get("/register", function (req, res, next) {
  accountPage.Login = false;
  console.log(accountPage);
  res.render("accounts", accountPage);
});

router.post("/register", function (req, res, next) {
  const user = new User(req.body);
  const errs = user.validateSync();
  if (errs) {
    return processErrors(errs, req, res);
  }
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    // Replace the plain password with the hashed password
    user.password = hashedPassword;
    // Store the use object in the DB
    user.save((err, result) => {
      //check if there are errors while saving the password
      if (err) {
        return processErrors(err, req, res);
      }
      const headermessage = `Account created ${result.fname}`;
      res.render("Thankyou", {
        message1: "registering",
        message2: "Please click the link below to Login",
      });
    });
  });
});

function processErrors(errs, req, res) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render("accounts", {
    errors: errorArray,
    ...req.body,
    accountPage,
  });
}
//middleware that is specific to this router,
//Checks that the user must be logged in
//to be added to every router file if user sign is necessary there.
//all the routes above will not require user to be login to be displayed
router.use((req, res, next) => {
  if (!req.user) res.status(403).redirect("/");
  else next();
});

module.exports = router;
