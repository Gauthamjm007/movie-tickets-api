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
  if (req.user.role == "Admin") {
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
  } else {
    res.send("you are not authorized to create a movie ");
  }
};

module.exports.update = (req, res) => {
  if (req.user.role == "Admin") {
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
  } else {
    res.send("you are not authorized to edit any movie details");
  }
};

module.exports.destroy = (req, res) => {
  if (req.user.role == "Admin") {
    const id = req.params.id;
    Movie.findByIdAndDelete(id)
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.send("you are not authorized to deleate any movie");
  }
};
