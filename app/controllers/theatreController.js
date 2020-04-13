const Theatre = require("../models/theatre");

module.exports.list = (req, res) => {
  Theatre.find()
    .then((theatre) => {
      res.json(theatre);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Theatre.findById(id)
    .then((theatre) => {
      res.json(theatre);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  console.log(body);
  const theatre = new Theatre(body);
  theatre
    .save()
    .then((theatre) => {
      res.json(theatre);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Theatre.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  })
    .then((theatre) => {
      res.json(theatre);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Theatre.findByIdAndDelete(id)
    .then((theatre) => {
      res.json(theatre);
    })
    .catch((err) => {
      res.json(err);
    });
};
