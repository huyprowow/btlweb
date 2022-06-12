exports.connection =(socket) => {
    // console.log(global.io);
  console.log(`a user ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
};
