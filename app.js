const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
// const expressListRoutes = require("express-list-routes");
const cors = require("cors");
const users = require("./routes/api/users");
const alerts = require("./routes/api/alerts");
const stations = require("./routes/api/stations");
const google = require("./routes/api/google");
const directions = require("./routes/api/directions");
// const twilio = require("./routes/api/twilio");
const path = require('path');
// const trainStations = require("./trainstations");
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./config/passport.js")(passport);

app.use("/api/users", users);
app.use("/api/alerts", alerts);
app.use("/api/google", google);
app.use("/api/stations", stations);
// app.use("/api/twilio", twilio);
app.use("/api/directions", directions);
// app.use("/api/trainStations", trainStations);
const port = process.env.PORT || 5001;

// for route debugging purposes
app.listen(port, () => console.log(`Server is running on port ${port}`));
// console.log(expressListRoutes(app, { prefix: "/" }));

// For Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}