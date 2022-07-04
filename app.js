const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const expressListRoutes = require("express-list-routes");
const cors = require("cors");
const users = require("./routes/api/users");
const alerts = require("./routes/api/alerts")
const google = require("./routes/api/google");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/alerts", alerts)
app.use("/api/google", google);

const port = process.env.PORT || 5001;

// for route debugging purposes
app.listen(port, () => console.log(`Server is running on port ${port}`));
console.log(expressListRoutes(app, { prefix: "/" }));
