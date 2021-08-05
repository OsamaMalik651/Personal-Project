const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const agencySchema = new mongoose.Schema({
  _id: { type: Number },
  AgencyId: { type: Number },
  AgncyAddress: { type: String },
  AgncyCity: { type: String },
  AgncyProv: { type: String },
  AgncyPostal: { type: String },
  AgncyCountry: { type: String },
  AgncyPhone: { type: String },
  AgncyFax: { type: String },
});

agencySchema.plugin(uniqueValidator);

// Create a model User using the userSchema
module.exports.Agency = mongoose.model("Agency", agencySchema);
