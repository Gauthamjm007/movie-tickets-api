const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RowSchema = new Schema({
  numberOfSeats: {
    type: Number,
    required: true,
  },
  aisleSeats: {
    type: [Number],
    default: [],
  },
  reservedSeats: {
    type: [Number],
    default: [],
  },
});

//Schema of Screen
//It contains field name of screen and array of seat information.
let ScreenSchema = new Schema({
  theater: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  screen_no: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  seatInfo: {
    type: Map,
    of: RowSchema,
    required: true,
  },
});

let Screen = mongoose.model("Screen", ScreenSchema);

module.exports = Screen;
