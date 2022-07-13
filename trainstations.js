const express = require("express");
const router = express.Router();
const axios = require("axios");
const rawTSData = require("./trainstation_info.json");
const mongoose = require("mongoose");
const Station = require("./models/Station");
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

const TSDataParser = () => {
  let TSData = [];
  let TSDataArr = Object.values(rawTSData);
  TSDataArr.map((station) => {
    if (station.borough === "M") {
      let stationData = {};
      stationData.name = station.stop_name;
      stationData.line = station.daytime_routes.toString().split(" ");
      stationData.latLng = {
        lat: station.gtfs_latitude,
        lng: station.gtfs_longitude,
      };
      TSData.push(stationData);
    }
  });
  return TSData;
};

const seedDB = async () => {
  await Station.deleteMany({});
  await Station.insertMany(TSDataParser());
};
seedDB()
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));
