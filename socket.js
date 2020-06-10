var express = require("express");
var app = express();
var http = require("http").createServer(app);

/*io.on('connection', function(socket){
  socket.on('calendar', function(login, password, id){
    socket.broadcast.to("calendar-" + id).emit('calendar', calendar);
  });
});*/

var io = require("socket.io")(http, {
  path: "/",
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  upgradeTimeout: 5000,
  cookie: false,
  origins: "*:*",
});

io.attach(http);

var peoples = 0;

io.on("connection", function (socket) {
  peoples++;
  socket.on("UPDATE_PEOPLES", function () {
    socket.broadcast.emit("UPDATE_PEOPLES", peoples);
  });

  socket.on("disconnect", function () {
    peoples--;
    socket.broadcast.emit("UPDATE_PEOPLES", peoples);
  });
});

http.listen(3000);
