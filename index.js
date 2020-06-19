var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var http = require("http").createServer(app);

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

const UserCalendars = require("./post/Calendar").UserCalendars;
app.post("/api/user/calendars", UserCalendars);

const UserCalendar = require("./post/Calendar").UserCalendar;
app.post("/api/user/calendar", UserCalendar);

const UserCalendarCreate = require("./post/Calendar").UserCalendarCreate;
app.post("/api/user/calendar/create", UserCalendarCreate);

const UserCalendarEdit = require("./post/Calendar").UserCalendarEdit;
app.post("/api/user/calendar/edit", UserCalendarEdit);

const UserCalendarDelete = require("./post/Calendar").UserCalendarDelete;
app.post("/api/user/calendar/delete", UserCalendarDelete);

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'dist/index.html')) })

http.listen(4000);
