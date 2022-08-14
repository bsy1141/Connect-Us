const SocketIO = require("socket.io");

exports.sio = (server) => {
  return SocketIO(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("message", (message) => {
      console.log(`message from ${socket.id} : ${message}`);
    });
    socket.emit("init", "hi react");

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};
