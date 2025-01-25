// nodemon is used which automatically restarts your node application when it detects any changes

// use 'npm run dev' to run server

/*





*/

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);

const cors = require("cors");

//const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

app.route("/").get((req, res) => {
  res.json("Hey welcome to server...");
});

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//     socket.on('chat message', (msg) => {
//       console.log(`Message: ${msg}`);
//       io.emit('chat message', msg); // Broadcast the message to all connected clients
//     });
//   });

io.on("connection", function (socket) {
  console.log("backend connected");
  socket.join("anonymous_group");
  socket.on("sendMsg", (msg) => {
    console.log(msg);
    io.to("anonymous_group").emit("sendMsgServer", {
      ...msg,
      type: "otherMsg",
    });

    // broadcast sends to all users except sender
    // socket.broadcast.to("anonymous_group").emit("sendMsgServer", {
    //   ...msg,
    //   type: "otherMsg",
    // });
    //  socket.emit("sendMsgServer" , {...msg, type:"otherMsg"}); //copy the whole msg json and overwrite the type
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpserver.listen(3000, () => {
  console.log("server started");
});
