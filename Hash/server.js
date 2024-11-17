const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => { // kalau ada yang connect tertrigger, stiap koneksi 1 klien 1 socket, ada idnya sndiri
  console.log(`Client ${socket.id} connected`); // cara akses id socket.id

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`); // klo client disconnect, ini ke trigger
  });

  socket.on("message", (data) => { // data ini string
    let { username, message } = data;
    console.log(`Receiving message from ${username}: ${message}`);
    io.emit("message", { username, message }) // smua id yang connect akan menerima pesan (brodcast). ini masuk ke channel
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// stiap koneksi bru id baru