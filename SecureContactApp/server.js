const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const contacts = require("./routes/contacts");
const users = require("./routes/users");
const expressValidator = require("express-validator");
const geocod = require("mapbox-geocoding");
const flash = require("connect-flash");
const session = require("express-session");
const request = require("postman-request");
const passport = require("passport");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
require("./middleware/passport")(passport);
const port = process.env.PORT || 5000;

connectDB();

// // Initialize APP
const app = express();

/// Passport Cofniguration
require("./middleware/passport")(passport);

// // Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//
// // in order to use body data we have to use this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Express Session Middleware
app.use(
  session({
    secret: "webapp2022",
    resave: true,
    saveUninitialized: true,
  })
);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

/// For the error message
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// // set static folder for client
app.use(express.static(path.join(__dirname, "public")));

// require("./config/passport")(passport);
// app.use(passport.initialize());
// app.use(passport.session());

app.get("/contact", (req, res) => {
  Contact.find({}, (err, contactInfos) => {
    if (err) {
      console.log(err);
    }
    res.render("index.pug", {
      obj: obj,
    });
  });
});

app.get("/", (req, res) => {
  res.render("index", { title: "Persistent Contact Management" });
});
app.use("/users", users);
app.use("/contacts", contacts);

app.use(errorHandler);

app.listen(port, () => console.log("Server is running in port", port));
