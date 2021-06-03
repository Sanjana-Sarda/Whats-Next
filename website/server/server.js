const axios = require('axios')

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
        socket.history = [];
        socket.nservices = ['Disney+', 'Prime Video', 'Hulu', 'Netflix'];
        socket.ngenres = ['Action', 'Sci-Fi', 'Adventure', 'Comedy', 'Western', 
                          'Animation', 'Fantasy', 'Biography', 'Drama', 'Music', 
                          'War', 'Crime', 'Fantasy', 'Thriller', 'Romance', 'History', 
                          'Mystery', 'Horror', 'Sport', 'Documentary', 'Musical', 
                          'News', 'Short', 'Reality-TV', 'Film-Noir', 'Talk Show'];
        socket.first = [];
        socket.second = [];
        socket.third = [];
        console.log(socket.name)
    });

    socket.on('settings', function (services, genres){
      services.forEach(function (serv) {
        if(socket.nservices.indexOf(serv)!=-1){
            socket.nservices.spice(socket.nservices.indexOf(serv), 1);
        }
      });
    
      genres.forEach(function (gen) {
        if(socket.ngenres.indexOf(gen)!=-1){
            socket.ngenres.spice(socket.ngenres.indexOf(gen), 1);
        }
      });
    });
    
    socket.on('pick_first_movie', function (){
      
      reqstuff = {
        method: 'post', 
        url: 'https://whats-next-188.herokuapp.com/ini',
        data: {
            'nservices': socket.nservices,
            'ngenres': socket.ngenres
          }
      }
      axios.post(reqstuff)
      .then(response => {
        var obj = JSON.parse(response);
        socket.first = obj.first;
        socket.second = obj.second;
      });
      socket.emit('Sending First Movie',socket.first);
    });
    
  
    socket.on('pick_movie', function (movie_name, movie_rating){
      //need to add checker for match right here
      //probs make an array of all fours and push onto it if movie_rating===4
      //then compare all clients' 4 ratings
      //need a special emit message for matchfound

      //place the movie name and rating in the correct place 
      if ((socket.first.length===1) && (socket.first[0].localeCompare(movie_name)===0)){
        socket.first = socket.first.push(movie_rating); //concatenates
      }
      else if ((socket.second.length===1) && (socket.second[0].localeCompare(movie_name)===0)){
        socket.second = socket.second.push(movie_rating); //concatenates
      }       
      else if ((socket.third.length===1) && (socket.third[0].localeCompare(movie_name)===0)){
        socket.third = socket.third.push(movie_rating); //concatenates
      }

       

      //figure out which one is still missing and push 
      if ((socket.first.length===1)){
        socket.emit(socket.first); 
      }
      else if ((socket.second.length===1)){
        socket.emit(socket.second); 
      }
      else if ((socket.third.length===1)){
        socket.emit(socket.third); 
      }
      else {
        const reqstuff = {
          method: 'post', 
          url: 'https://whats-next-188.herokuapp.com/recs',
          data: {
            'nservices': socket.nservices,
            'ngenres': socket.ngenres,
            'first': socket.first,
            'second': socket.second,
            'history': socket.history
          }
        };
        axios.post(reqstuff)
        .then(response => {
          var obj = JSON.parse(response);
          socket.first = obj.first;
          socket.second = obj.second;
          socket.history = history + socket.first
        });
        socket.emit(socket.first); 
      }
    
    });
});



io.sockets.on("disconnect", () => {
    console.log(`User disconnected: ${socket.name}`);
    clients.splice(clients.indexOf(socket), 1);
  });

// now, it's easy to send a message to just the clients in a given room

server.listen(port, () => console.log(`Listening on port ${port}`));