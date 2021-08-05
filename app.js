var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const dbURL = "mongodb://localhost:27017/tp";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var accountRouter = require("./routes/Account");
var contactRouter = require("./routes/Contact");
var packagesRouter = require("./routes/Packages");
var purchaseRouter = require("./routes/Purchase");
// var updateDetails = require("./routes/updateDetail");

var app = express();
//
const mongoose = require("mongoose");
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
//---------------------------------
//For Passport.js
require("./my-passport").init(app);
//---------------------------------

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/contact", contactRouter);
app.use("/packages", packagesRouter);
app.use("/purchasePage", purchaseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
