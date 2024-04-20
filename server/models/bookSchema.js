const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookID: { type: Number, required: true, unique: true },
    bookName: { type: String, required: true },
    noOfCopies: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
