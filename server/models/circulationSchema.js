const { default: mongoose } = require("mongoose");

const circulationSchema = new mongoose.Schema(
  {
    bookID: {
      type: Number,
      ref: "Book",
      required: true,
    },
    memberShipId: {
      type: Number,
      ref: "Membership",
      required: true,
    },
    event: { type: String, enum: ["checkout", "return"] },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Circulation", circulationSchema);
