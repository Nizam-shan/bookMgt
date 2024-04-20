const bookSchema = require("../models/bookSchema");
const circulationSchema = require("../models/circulationSchema");
const memberShipSchema = require("../models/memberShipSchema");

// checkout
exports.checkout = async (req, res) => {
  const { memberShipId, bookID } = req.body;

  try {
    const book = await bookSchema.findOne({ bookID: bookID });
    if (!book || book.noOfCopies === 0) {
      return res
        .status(400)
        .json({ error: "Book not availbale or book not found" });
    }

    const memberShip = await memberShipSchema.findOne({
      memberShipId: memberShipId,
    });
    if (!memberShip) {
      return res.status(400).json({ error: "memberShip not found" });
    }

    const circulation = new circulationSchema({
      memberShipId,
      bookID,
      event: "checkout",
      date: new Date(),
    });
    await circulation.save();
    book.noOfCopies = -1;
    await book.save();

    res.status(200).json({ success: "book checkedout successfully" });
  } catch (error) {
    console.log("error", error.message);
  }
};

// returm

exports.returnBook = async (req, res) => {
  const { memberShipId, bookID } = req.body;

  try {
    const circulation = await circulationSchema.findOne({
      memberShipId,
      bookID,
      event: "checkout",
    });

    if (!circulation) {
      return res.status(400).json({ error: "Book not found" });
    }

    circulation.event = "return";
    circulation.date = new Date();
    await circulation.save();

    const book = await bookSchema.findById(bookID);
    book.noOfCopies = +1;
    await book.save();
    res.status(200).json({ success: "book returned successfully" });
  } catch (error) {
    console.log("🚀 ~ exports.returnBook= ~ error:", error);
  }
};

// api to insert book

exports.insertBook = async (req, res) => {
  const { bookID, bookName, noOfCopies } = req.body;
  try {
    if (!bookID || !bookName) {
      return res.status(402).json({ message: "bookId and name is required" });
    }

    const exist = await bookSchema.findOne({ bookID });
    if (exist) {
      return res.status(409).json({ message: "already exist" });
    }

    const newbook = new bookSchema({
      bookID,
      bookName,
      noOfCopies,
    });

    await newbook.save();
    res.status(201).json({ data: newbook });
  } catch (error) {
    console.log("error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

exports.insertMembership = async (req, res) => {
  const { memberShipId, memberShipName } = req.body;
  try {
    if (!memberShipId || !memberShipName) {
      return res.status(402).json({ message: "bookId and name is required" });
    }

    const exist = await memberShipSchema.findOne({ memberShipId });
    if (exist) {
      return res.status(409).json({ message: "already exist" });
    }

    const newbook = new memberShipSchema({
      memberShipId,
      memberShipName,
    });

    await newbook.save();
    res.status(201).json({ data: newbook });
  } catch (error) {
    console.log("error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

exports.bookGet = async (req, res) => {
  try {
    const books = await bookSchema.find();
    res.status(200).json({ data: books });
  } catch (error) {
    console.log("🚀 ~ exports.bookGet= ~ error:", error.message);
  }
};
