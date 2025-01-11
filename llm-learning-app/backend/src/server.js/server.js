const http = require('http');
const app = require('./app');
const { Server } = require("socket.io")

const connectDB = require('./config/database');
const PORT = process.env.PORT || 5000;

connectDB();
const server = http.createServer(app)
const io = new Server(server, {
   cors: {
     origin: "*"
   }
})

io.on("connection", (socket) => {
   console.log("User Connected: ", socket.id);

   socket.on("disconnect", () => {
      console.log("User Disconnected: ", socket.id);
   })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});