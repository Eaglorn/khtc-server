var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  path: '/test',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  upgradeTimeout: 5000,
  cookie: false
});

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

/*
app.use(express.urlencoded({ limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));
app.use(express.multipart({ limit:"10mb" }));
*/

const Authorization = require("./post/Authorization");
app.post("/api/authorization", Authorization);

const UserCalendars = require("./post/Calendar").UserCalendars;
app.post("/api/user/calendars", UserCalendars);

const UserCalendar = require("./post/Calendar").UserCalendar;
app.post("/api/user/calendar", UserCalendar);

const UserCalendarCreate = require("./post/Calendar").UserCalendarCreate;
app.post("/api/user/calendar/create", UserCalendarCreate);

const UserCalendarDelete = require("./post/Calendar").UserCalendarDelete;
app.post("/api/user/calendar/delete", UserCalendarDelete);

io.on('connection', function(socket){
  socket.on('calendar', function(login, password, id){
    socket.broadcast.to("calendar-" + id).emit('calendar', calendar);
  });
});

http.listen(4000, "46.8.146.12");
