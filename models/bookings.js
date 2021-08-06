const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookingsSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    ref: "User",
  },
  PackageId: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  travellerCount: {
    type: Number,
  },
  title: {
    type: String,
  },
  PkgStartDate: {
    type: Date,
  },
  AgentId: {
    type: Number,
    default: 1,
  },
  BookingDate: {
    type: Date,
    default: new Date(),
  },
});

bookingsSchema.plugin(uniqueValidator);
// Create a model User using the userSchema
module.exports.Bookings = mongoose.model("Bookings", bookingsSchema);
