const mongoose = require("mongoose");
const connectDb = async () => {
  const url = "mongodb+srv://shannizam111:Nizam@cluster0.blymlc1.mongodb.net/";

  mongoose
    .connect(url)
    .then(() => console.log("connected"))
    .catch((error) => console.log("Errror conecting ", error));
};
module.exports = connectDb;
