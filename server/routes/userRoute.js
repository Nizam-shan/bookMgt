const express = require("express");
const router = express.Router();
const controler = require("../controlers/userControler");

router.post("/add-book", controler.insertBook);
router.post("/add-mem", controler.insertMembership);
router.get("/add-book-get", controler.bookGet);
router.post("/check-out", controler.checkout);
router.post("/return", controler.returnBook);

module.exports = router;
