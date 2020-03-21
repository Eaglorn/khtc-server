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

const Authorization = require("./post/Authorization");
app.post("/api/authorization", Authorization);

const GetUserCalendars = require("./post/Calendar").GetUserCalendars;
app.post("/api/user/calendars", GetUserCalendars);

const GetUserCalendar = require("./post/Calendar").GetUserCalendar;
app.post("/api/user/calendar", GetUserCalendar);

const UserCreateCalendar = require("./post/Calendar").UserCreateCalendar;
app.post("/api/user/calendar/create", UserCreateCalendar);

io.on('connection', function(socket){
  socket.on('calendar', function(login, password, id){
    socket.broadcast.to("calendar-" + id).emit('calendar', calendar);
  });
});

http.listen(4000, "46.8.146.12");
