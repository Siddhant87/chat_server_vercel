


// nodemon is used which automatically restarts your node application when it detects any changes

const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");


const app = express();
const httpserver = createServer(app);
const io = new Server(httpserver);

const cors = require('cors');

//const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());


app.route("/").get((req , res)=>{
    res.json("hey welcome to server");
})


io.on("connection",(socket)=>{
    console.log("backend connected");
    socket.on("sendMsg",(msg)=>{
        console.log(msg);
    });
});

httpserver.listen(3000,()=>{
    console.log("server started");
});