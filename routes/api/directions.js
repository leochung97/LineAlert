const express = require("express");
const router = express.Router();
const axios = require("axios");

const parseRoutes = (routesArr) => {
  let filteredRoutesarr = [];
  routesArr.map((route) => {
    let filteredRoute = {};

    filteredRoute.startLocation = route.legs[0].start_location;
    filteredRoute.arrivalTime = route.legs[0].arrival_time.text;
    filteredRoute.distance = route.legs[0].distance.text;
    filteredRoute.duration = route.legs[0].duration.text;
    filteredRoute.endLocation = route.legs[0].end_location;
    filteredRoute.polyline = route.overview_polyline.points;
    let trains = [];
    route.legs[0].steps.map((subroute) => {
      if (subroute.travel_mode === "TRANSIT") {
        let trainInfo = {};
        console.log(subroute.transit_details.departure_stop)
        trainInfo.polyline = subroute.polyline.points;
        trainInfo.instructions = subroute.html_instructions;
        trainInfo.trainName = subroute.transit_details.line.short_name;
        trainInfo.arrivalStop = subroute.transit_details.arrival_stop.name
        trainInfo.departureStop = subroute.transit_details.departure_stop.name
        trainInfo.arrivalStopLocation = subroute.transit_details.arrival_stop.location
        trainInfo.departureStopLocation = subroute.transit_details.departure_stop.location
        trains.push(trainInfo);
      }
      filteredRoute.trains = trains;
    });
    filteredRoutesarr.push(filteredRoute);
  });
  return filteredRoutesarr;
};

router.post("/", (req, res) => {
  var options = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/directions/json?alternatives=true&mode=transit&transit_mode=subway&origin=${req.body.origin}&destination=${req.body.destination}&key=${process.env.REACT_APP_MAP_KEY}`,
  };
  axios(options).then((directions) => {
    if (directions.data.status === "OK") {
      filteredData = parseRoutes(directions.data.routes);
      filteredData
        ? res.status(200).json(filteredData)
        : res.status(404).json({ error: "Sorry no routes found" });
      // res.json(req.body)
    } else {
      res.json({ error: "Invalid request sent" });
    }
  });
});

module.exports = router;
