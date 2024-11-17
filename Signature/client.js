const io = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let registeredUsername = "";
let username = "";
const users = new Map(); // MAP untuk memory temporary, kl program mati otomatis hilang

socket.on("connect", () => {
  console.log("Connected to the server");

  rl.question("Enter your username: ", (input) => {
    username = input;
    registeredUsername = input;
    console.log(`Welcome, ${username} to the chat`);
    const { privateKey: senderPrivateKey, publicKey: senderPublicKey } = crypto.generateKeyPairSync("rsa", options);
    socket.emit("registerPublicKey", {
      username,
      publicKey: senderPublicKey, // DIGANTI DGN REAL PUBLIC KEY
    });
    rl.prompt();

    rl.on("line", (message) => {
      if (message.trim()) {
        if ((match = message.match(/^!impersonate (\w+)$/))) {
          username = match[1];
          console.log(`Now impersonating as ${username}`);
        } else if (message.match(/^!exit$/)) {
          username = registeredUsername;
          console.log(`Now you are ${username}`);
        } else {
          const signature = crypto.sign("sha256", Buffer.from(message), senderPrivateKey);
          socket.emit("message", { username, message, signature });
        }
      }
      rl.prompt();
    });
  });
});

socket.on("init", (keys) => {
  keys.forEach(([user, key]) => users.set(user, key));
  console.log(`\nThere are currently ${users.size} users in the chat`);
  rl.prompt();
});

socket.on("newUser", (data) => {
  const { username, publicKey } = data;
  users.set(username, publicKey);
  console.log(`${username} join the chat`);
  rl.prompt();
});

socket.on("message", (data) => {
  const { username: senderUsername, message: senderMessage, signature } = data;

  if (senderUsername !== username) {
    const senderData = users.get(senderUsername); // dicek ke memory
    if (senderData && crypto.verify("sha256", Buffer.from(senderMessage), senderData, signature)) {
      console.log(`${senderUsername}: ${senderMessage}`);
    } else {
      console.log(`[WARNING : this user is fake] ${senderUsername}: ${senderMessage}`);
    }
    rl.prompt();
  }

});

socket.on("disconnect", () => {
  console.log("Server disconnected, Exiting...");
  rl.close();
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("\nExiting...");
  socket.disconnect();
  rl.close();
  process.exit(0);
});

const options = {
  modulusLength: 2048, // default is 2048 bits
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
};