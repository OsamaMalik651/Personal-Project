const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: "Please Enter you name",
    lowercase: true,
  },
  Email: {
    type: String,
    required: "Please Enter you email.",
    lowercase: true,
  },
  Query: {
    type: String,
    required: "Please Enter your query",
    lowercase: true,
  },
});

// Create a model User using the userSchema
module.exports.contactForm = mongoose.model("contactForm", contactFormSchema);
