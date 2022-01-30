//tämä pyörii serverin päässä
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 8081;

let connections = [];
let number_of_connections = 0;

io.on("connection", (socket)=>{
    connections[socket.id] = socket;
    number_of_connections++;

    socket.emit("server-to-client", "Hello from server");

    console.log("client connected. number_of_connections: ", number_of_connections);
    socket.on("disconnect", (socket)=>{
        delete connections[socket.id];
        number_of_connections--;
        console.log("client disconnected. number_of_connections: ", number_of_connections);
        //
    });

    socket.on("client-to-server", (message)=>{
        console.log(message);
});

app.use(express.static("public"));

server.listen(PORT);