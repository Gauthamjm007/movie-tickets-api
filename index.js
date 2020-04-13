const express = require("express");
const app = express();
const setupDB = require("./config/database");
const router = require("./config/routes");
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", router);
setupDB();

app.listen(port, () => {
  console.log("listening to port number ", port);
});
