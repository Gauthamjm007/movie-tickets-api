const express = require("express");
const router = express();
const usersController = require("../app/controllers/usersController");
const authenticateUser = require("../app/middleware/authentication");
const theatreController = require("../app/controllers/theatreController");
const movieController = require("../app/controllers/movieController");
const screenController = require("../app/controllers/screenController");

//user register,login,get all user details
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/account", authenticateUser, usersController.account);
router.delete("/logout", authenticateUser, usersController.logout);
router.delete("/account/:id", authenticateUser, usersController.destroy);

router.get("/movie", movieController.list);
router.get("/movie/:id", movieController.show);
router.put("/movie/:id", authenticateUser, movieController.update);
router.post("/movie", authenticateUser, movieController.create);
router.delete("/movie/:id", authenticateUser, movieController.destroy);

router.get("/theatre", theatreController.list);
router.get("/theatre/:id", theatreController.show);
router.put("/theatre", authenticateUser, theatreController.update);
router.post("/theatre", authenticateUser, theatreController.create);
router.delete("/theatre/:id", authenticateUser, theatreController.destroy);

router.get("/screens", screenController.list);
router.delete("/screens/:id", authenticateUser, screenController.destroy);
router.post("/screens", authenticateUser, screenController.create);
router.post(
  "/screens/:screen_id/reserve",
  authenticateUser,
  screenController.reserve
);
router.get("/screens/:screen_id/seats", screenController.infoseats);
router.get("/screens/movie/:id", screenController.listByMovie);
router.get("/screens/theatre/:id", screenController.listByTheatre);

module.exports = router;
