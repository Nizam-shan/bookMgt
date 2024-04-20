const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const route = require("./routes/userRoute");

const db = require("./connection/database");
db();

app.get("/", (req, res) => {
  res.send("Home page");
});
app.use("/test", route);

app.listen(port, () => {
  console.log("Up and running in", port);
});
