

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

const crypto = require('crypto');


io.on("connection", (socket) => { // kalau ada yang connect tertrigger, stiap koneksi 1 klien 1 socket, ada idnya sndiri
  console.log(`Client ${socket.id} connected`); // cara akses id socket.id

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`); // klo client disconnect, ini ke trigger
  });

  socket.on("message", (data) => { // data ini string
    let { username, message } = data;
    const hashValidate = crypto.createHash('sha256').update(message).digest('hex');
    let hashMessage = crypto.createHash('sha256').update(message).digest('hex');

    if (message.includes("babi")) {
        const modifiedMessage = message + "(modified by server)";
        hashMessage = crypto.createHash('sha256').update(modifiedMessage).digest('hex');
    }

    if (hashValidate !== hashMessage)
    {
        message = "The message is modified by server because contain inappropriate content.";
        io.emit("message", { username, message });
    } else {
        console.log(`Receiving message from ${username}: ${message}`);
        io.emit("message", { username, message }) // smua id yang connect akan menerima pesan (brodcast). ini masuk ke channel
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// stiap koneksi bru id baru