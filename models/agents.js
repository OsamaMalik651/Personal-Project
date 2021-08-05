const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const agentSchema = new mongoose.Schema({
  _id: Number,
  username: { type: String },
  password: { type: String },
  AgentId: { type: Number },
  AgtFirstName: { type: String },
  AgtMiddleInitial: { type: String },
  AgtLastName: { type: String },
  AgtBusPhone: { type: String },
  AgtEmail: { type: String },
  AgtPosition: { type: String },
  AgencyId: { type: Number },
});

agentSchema.plugin(uniqueValidator);

// Create a model User using the userSchema
module.exports.Agents = mongoose.model("Agents", agentSchema);
