require("dotenv").config({ path: ".env" });
// var app = require("./app");
// const port=process.env.PORT ||8000;

// app.listen(port,() =>{
//   console.log(`listen on port ${port}`);
// });
const app = require("./app");
const debug = require("debug")("backend:server");
const http = require("http");

// Get port from environment and store in Express.

var port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

// Create HTTP server.

const server = http.createServer(app);

// establish socket

const {Server}=require("socket.io");
const SocketHandle=require("./utils/socket");
//! global variable
global.io=new Server(server,{
  cors:{
    origin:"*"
  }
});
global.io.on("connection",SocketHandle.connection)

//-----------ket noi mongodb-------------//
const mongoose = require("mongoose");

var mongoDB = process.env.FOOD_DB_URI.toString();

mongoose
  .connect(mongoDB, {
    maxPoolSize: 1000, //toi da 1000 nguoi co the ket noi,
    wtimeoutMS: 2500, //doi het thoi gian (wait time out):  2500ms
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    //loi
    console.error(err.stack);
    process.exit(1);
  })
  .then(async () => {
    //ket noi dc voi db=> bat dau nghe,bat loi cho server
    // Listen on provided port, on all network interfaces.
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  });

// Normalize a port into a number, string, or false.

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
