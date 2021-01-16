//dependencies
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const user = process.env.mongo_user;
const pass = process.env.mongo_password;
const dbname = process.env.mongo_dbname;

mongoose.connect(
  "mongodb+srv://" +
    user +
    ":" +
    pass +
    "@cluster0.bf91x.mongodb.net/" +
    dbname +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//start express
const app = express();

//route definitions
const NotesRoutes = require("./routes/notes");
const PasswordsRoutes = require("./routes/passwords");

//middleware
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//CORS handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST");
    return res.status(200).json({});
  }
  next();
});

// route requests
app.use("/api/notes", NotesRoutes);
app.use("/api/passwords", PasswordsRoutes);

// bad route error
app.use((req, res, next) => {
  const error = new Error("Uhh...??? Path not found in API:(");
  error.status = 404;
  next(error);
});

//error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
