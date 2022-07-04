const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const google = require("./routes/api/google");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressListRoutes = require("express-list-routes");
require("dotenv").config();
const cors = require("cors");
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.get("/", (req, res) => res.send("Hello World"));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

app.use("/api/google", google);
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
expressListRoutes(app, { prefix: "/api" });
