const User = require("../models/user");

const authenticateUser = function (req, res, next) {
  const token = req.header("xauth");
  User.findByToken(token)
    .then((user) => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status("401").json({ notice: "token is not avaliable" });
      }
    })
    .catch((err) => {
      res.status("401").json(err);
    });
};
module.exports = authenticateUser;
