//dependencies
require("dotenv").config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const dbname = process.env.MONGO_DBNAME;

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//route definitions
const NotesRoutes = require("./api/routes/notes");
const PasswordsRoutes = require("./api/routes/passwords");

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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`API listening on ${port}`);
