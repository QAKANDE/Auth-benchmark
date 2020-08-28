const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cors = require("cors");
const userRoutes = require("./services/users/index");
const deezerRoutes = require("./services/deezerFetch/index");
const listEndpoints = require("express-list-endpoints");
const server = express();
server.use(cors());
const port = 3002;
server.use(express.json());
server.use("/users", userRoutes);
server.use("/deezer", deezerRoutes);
console.log(listEndpoints(server));
mongoose
  .connect("mongodb://localhost:27017/spotify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
