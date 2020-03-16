var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

const Authorization = require("./post/Authorization");
app.post("/api/authorization", Authorization);

const GetUserCalendars = require("./post/Calendar").GetUserCalendars;
app.post("/api/user/calendars", GetUserCalendars);

app.listen(4000, "46.8.146.12");
