const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
  },
  release_date: {
    type: String,
  },
  director: {
    type: String,
  },
  certification: {
    type: String,
    enum: ["U", "U/A", "A", "S"],
  },
  dimension: {
    type: String,
    enum: ["2D", "3D"],
  },
  genre: {
    type: String,
    enum: [
      "Romance",
      "Sci-Fi",
      "Thriller",
      "Mystery",
      "Comedy",
      "Action",
      "Horror",
      "Biopic",
      "Sport",
      "Drama",
      "Fantasy",
    ],
  },
  cast: {
    type: [String],
  },
  poster: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
