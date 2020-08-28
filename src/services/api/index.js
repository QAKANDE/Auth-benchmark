const express = require("express");
const axios = require("axios");
const apiRouter = express.Router();

apiRouter.get("/albums/:artist", authorize, async (req, res, next) => {
  try {
    const artist = req.params.artist;
    const response = await axios(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "b41254000bmshb62e314b3254f24p1dac92jsn6f1fc3174939",
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

apiRouter.get("/songs/:albumid", async (req, res, next) => {
  try {
    const albumid = req.params.albumid;
    let response = await axios(
      "https://deezerdevs-deezer.p.rapidapi.com/album/" + albumid,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "84d2e1bc2amsh0bcbc81dd32f547p1526bajsncbac98b453bc",
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});
