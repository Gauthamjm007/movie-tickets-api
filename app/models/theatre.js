const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

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
  location: GeoSchema,
});

const Theatre = mongoose.model("Theatre", theatreSchema);
module.exports = Theatre;
