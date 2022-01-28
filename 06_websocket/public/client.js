let socket = io();

socket.on("server-to-client", (message)=>{
    console.log(message);
    socket.emit("client-to-server", "Hello from client");
});

const send_message = ()=>{
    
}