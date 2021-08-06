const mongoose = require("mongoose");

const agentCommission = new mongoose.Schema({
  AgentId: {
    type: Number,
    ref: "Agent",
  },
  AgentCommission: [Number],
});

// Create a model User using the userSchema
module.exports.AgentCommission = mongoose.model(
  "AgentCommission",
  agentCommission
);
