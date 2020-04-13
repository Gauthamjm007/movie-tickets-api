const User = require("../models/user");
const _ = require("lodash");

//localhost:3000/register

module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

//localhost:3000/login

module.exports.login = (req, res) => {
  const body = req.body;
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateToken();
    })

    .then((token) => {
      res
        .setHeader("xauth", token)
        .send("logged in sucessfully,token is sent in header");
    })
    .catch((err) => {
      res.json(err);
    });
};
//localhost:3000/accounts
module.exports.account = (req, res) => {
  User.find().then((user) => {
    res.json(user);
  });
};
//localhost:3000/users/logout

module.exports.logout = (req, res) => {
  const { user, token } = req;
  console.log("user", req);
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.json({ notice: "successfully logged out" });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
