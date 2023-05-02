var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
let mongoose = require("mongoose");
var appRoutes = require("./routes/app");
var authRoutes = require("./routes/user");
var messageRoutes = require("./routes/messages");
const cors = require("cors");
require('dotenv').config();
// const { MongoClient} = require("mongodb");

var app = express();

const db_name = "node-angular";
async function main() {
  mongoose.connect(
    `mongodb+srv://${process.env.BD_LOGIN}:${process.env.BD_PASSWORD}@cluster0.es8furw.mongodb.net/test`
  );

  console.log("conectado");
}
main().catch((err) => console.log(err));

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

/* ============APLICATION ROUTES============== */

app.use("/api/autenticacao", authRoutes);
app.use("/api/mensagens", messageRoutes);
app.use("/", appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render("index");
});

module.exports = app;
