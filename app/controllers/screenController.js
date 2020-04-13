const Screen = require("../models/screen");
let isAvailable = require("../util/findSeatAvailability");
let getUnreservedSeats = require("../util/findUnreservedSeats");
let getSeatAvailableAtChoice = require("../util/findSeatOfChoice");

module.exports.create = async (req, res) => {
  try {
    let screen = new Screen(req.body);
    await screen
      .save()
      .then((screen) => res.json(screen))
      .catch((err) => {
        res.json(err);
      });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.reserve = async (req, res) => {
  try {
    let screenName = req.params.screen_name;
    let seats = req.body.seats;
    await isAvailable(screenName, seats);
    res.send("Reservation is successful");
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.infoseats = async (req, res) => {
  try {
    let query = req.query;
    if (query.status && query.status === "unreserved") {
      //to get the available seats for a given screen
      let unreservedSeats = await getUnreservedSeats(req.params.screen_name);
      res.send(unreservedSeats);
    } else if (query.numSeats && query.choice) {
      //to get information of available tickets at a given position
      let seatOfChoice = await getSeatAvailableAtChoice(
        req.params.screen_name,
        query.numSeats,
        query.choice
      );
      res.send(seatOfChoice);
    } else {
      //return error 404 if any other endpoint is used.
      return res.status(404).send("Page not found");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.list = (req, res) => {
  Screen.find()
    .then((screen) => {
      res.json(screen);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Screen.findByIdAndDelete(id)
    .then((screen) => {
      res.json(screen);
    })
    .catch((err) => {
      res.json(err);
    });
};
