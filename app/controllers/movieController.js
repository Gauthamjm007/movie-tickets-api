const Movie = require("../models/movie");

module.exports.list = (req, res) => {
  Movie.find()
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  console.log(body);
  const movie = new Movie(body);
  movie
    .save()
    .then((Movie) => {
      res.json(Movie);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
};
