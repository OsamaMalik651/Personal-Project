const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = new mongoose.Schema({
  Id: { type: Number },
  EmpFirstName: { type: String },
  EmpMiddleInitial: { type: String },
  EmpLastName: { type: String },
  EmpBusPhone: { type: String },
  EmpEmail: { type: String },
  EmpPosition: { type: String },
  role: { type: String },
  username: { type: String },
  password: { type: String },
});

employeeSchema.plugin(uniqueValidator);

// Create a model User using the userSchema
module.exports.Employees = mongoose.model("Employee", employeeSchema);
