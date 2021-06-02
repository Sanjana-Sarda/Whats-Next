const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

var clients = [];
// handle incoming connections from clients

io.sockets.on('connection', function(socket) {
    clients.push(socket);
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
    
    //client sending username 
    socket.on('send-nickname', function(nickname) {
        socket.name = nickname;
        clients.forEach(function (cl) {
            if(socket.name !== cl.name){
                cl.emit("New User Joined",nickname);
            }
            
        });
        console.log(socket.name)
    });
});


io.sockets.on("disconnect", () => {
    console.log(`User disconnected: ${socket.name}`);
    clients.splice(clients.indexOf(socket), 1);
  });

// now, it's easy to send a message to just the clients in a given room

server.listen(port, () => console.log(`Listening on port ${port}`));