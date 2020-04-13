const mongoose = require("mongoose");

const setupDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/nvest")
    .then(() => {
      console.log("connected to db.....");
    })
    .catch(() => {
      console.log("connecting to database failed");
    });
};

module.exports = setupDB;
