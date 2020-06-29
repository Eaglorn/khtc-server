var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var http = require("http").createServer(app);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

const Authorization = require("./post/authorization/Authorization");
app.post("/api/authorization", Authorization);

const UserCalendars = require("./post/calendar/UserCalendars");
app.post("/api/user/calendars", UserCalendars);

const UserCalendar = require("./post/calendar/UserCalendar");
app.post("/api/user/calendar", UserCalendar);

const UserCalendarCreate = require("./post/calendar/UserCalendarCreate");
app.post("/api/user/calendar/create", UserCalendarCreate);

const UserCalendarEdit = require("./post/calendar/UserCalendarEdit");
app.post("/api/user/calendar/edit", UserCalendarEdit);

const UserCalendarDelete = require("./post/calendar/UserCalendarDelete");
app.post("/api/user/calendar/delete", UserCalendarDelete);

const UserCalendarEventsMonth = require("./post/calendar/UserCalendarDatesMonth");
app.post("/api/user/calendar/dates_month", UserCalendarEventsMonth);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

http.listen(4000);
