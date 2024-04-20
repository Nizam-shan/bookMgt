const { default: mongoose } = require("mongoose");

const memberShip = new mongoose.Schema(
  {
    memberShipId: { type: Number, unique: true },
    memberShipName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", memberShip);
