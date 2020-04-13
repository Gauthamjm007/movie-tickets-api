const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theatreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  no_screens: {
    type: Number,
  },
  no_of_seats: {
    type: Number,
  },
  address: {
    type: String,
  },
  geolocation: {
    type: String,
  },
});

const Theatre = mongoose.model("Theatre", theatreSchema);
module.exports = Theatre;


