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

// User
const UserAuthorization = require("./post/user/Authorization");
app.post("/api/user/authorization", UserAuthorization);

// Calendar
const UserCalendars = require("./post/calendar/Calendars");
app.post("/api/user/calendars", UserCalendars);

const UserCalendar = require("./post/calendar/Calendar");
app.post("/api/user/calendar", UserCalendar);

const UserCalendarCreate = require("./post/calendar/Create");
app.post("/api/user/calendar/create", UserCalendarCreate);

const UserCalendarEdit = require("./post/calendar/Edit");
app.post("/api/user/calendar/edit", UserCalendarEdit);

const UserCalendarDelete = require("./post/calendar/Delete");
app.post("/api/user/calendar/delete", UserCalendarDelete);

// Event
const UserEventDatesMonth = require("./post/event/DatesMonth");
app.post("/api/user/calendar/dates/month", UserEventDatesMonth);

const UserEventsDay = require("./post/event/EventsDay");
app.post("/api/user/calendar/events/day", UserEventsDay);

const UserEventDelete = require("./post/event/Delete");
app.post("/api/user/calendar/event/delete", UserEventDelete);

const UserEventCreate = require("./post/event/Create");
app.post("/api/user/calendar/event/create", UserEventCreate);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

http.listen(4000);
