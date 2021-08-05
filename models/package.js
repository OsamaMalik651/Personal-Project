var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const packageSchema = new mongoose.Schema({
  PackageId: {
    type: Number,
    required: "Please enter the Package ID.",
    trim: true,
    unique: "The Package ID must be unique.",
  },
  PkgName: {
    type: String,
    required: "Please enter the Package Name",
    trim: true,
    unique: "The Package Name must be unique.",
  },
  PkgStartDate: {
    type: Date,
    required: "Please enter the Package Start Date",
  },
  PkgEndDate: {
    type: Date,
    required: "Please enter the Package End Date",
  },
  PkgDesc: {
    type: String,
    required: "Please enter the Package Details.",
  },
  PkgBasePrice: {
    type: Number,
    required: "Please enter the Package Base Price.",
  },
  PkgAgencyCommission: {
    type: Number,
    required: "Please enter the Agency Commission for Package.",
  },
  PkgImgSrc: {
    type: String,
    require: "Please enter the image Url for the package.",
  },
});
packageSchema.plugin(uniqueValidator);
module.exports.Packages = mongoose.model("Packages", packageSchema);
