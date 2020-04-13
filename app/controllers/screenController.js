const Screen = require("../models/screen");
let isAvailable = require("../util/findSeatAvailability");
let getUnreservedSeats = require("../util/findUnreservedSeats");
let getSeatAvailableAtChoice = require("../util/findSeatOfChoice");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nvestlab.gjm@gmail.com",
    pass: "nvestlab@123",
  },
});

var mailOptions = {
  from: "nvestlab.gjm@gmail.com",
  to: "example@123",
  subject: "Ticket Booking",
  text: "Congratulation on your booking",
};

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
    let screenId = req.params.screen_id;
    let seats = req.body.seats;

    mailOptions.text = "Your theater booking at  " + screenId;
    " Total Seats: " + seats + "has been sucessfully booked";

    mailOptions.to = req.user.email;

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await isAvailable(screenId, seats).then((screen) => {});
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
      let unreservedSeats = await getUnreservedSeats(req.params.screen_id);
      res.send(unreservedSeats);
    } else if (query.numSeats && query.choice) {
      //to get information of available tickets at a given position
      let seatOfChoice = await getSeatAvailableAtChoice(
        req.params.screen_id,
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
  if ((req.user.role = "Admin")) {
    const id = req.params.id;
    Screen.findByIdAndDelete(id)
      .then((screen) => {
        res.json(screen);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.send("you are not authorized to send data");
  }
};

module.exports.listByMovie = (req, res) => {
  const id = req.params.id;
  Screen.find({ movie: id })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.listByTheatre = (req, res) => {
  const id = req.params.id;
  Screen.find({ theatre: id })
    .then((theatre) => {
      res.json(theatre);
    })
    .catch((err) => {
      res.json(err);
    });
};
