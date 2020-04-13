const express = require("express");
const router = express();
const usersController = require("../app/controllers/usersController");
const authenticateUser = require("../app/middleware/authentication");
const theatreController = require("../app/controllers/theatreController");
const movieController = require("../app/controllers/movieController");
const screenController = require("../app/controllers/screenController");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/account", authenticateUser, usersController.account);
router.delete("/logout", authenticateUser, usersController.logout);
router.delete("/account/:id", authenticateUser, usersController.destroy);

router.get("/movie", movieController.list);
router.get("/movie/:id", movieController.show);
router.put("/movie/:id", movieController.update);
router.post("/movie", movieController.create);
router.delete("/movie/:id", movieController.destroy);

router.get("/theatre", theatreController.list);
router.get("/theatre/:id", theatreController.show);
router.put("/theatre", theatreController.update);
router.post("/theatre", theatreController.create);
router.delete("/theatre/:id", theatreController.destroy);

router.get("/screens", screenController.list);
router.delete("/screens/:id", screenController.destroy);
router.post("/screens", screenController.create);
router.post("/screens/:screen_name/reserve", screenController.reserve);
router.get("/screens/:screen_name/seats", screenController.infoseats);

module.exports = router;
