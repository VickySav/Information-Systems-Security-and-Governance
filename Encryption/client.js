const io = require("socket.io-client");
const readline = require("readline");

const options = {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
};

const socket = io("http://localhost:3000");

const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let targetUsername = "";
let username = "";
const users = new Map();

const { privateKey: senderPrivateKey, publicKey: senderPublicKey } = crypto.generateKeyPairSync("rsa", options);

socket.on("connect", () => {
  console.log("Connected to the server");

  rl.question("Enter your username: ", (input) => {
    username = input;
    console.log(`Welcome, ${username} to the chat`);
    socket.emit("registerPublicKey", {
      username,
      publicKey: senderPublicKey
    });
    rl.prompt();

    rl.on("line", (message) => {
      if (message.trim()) {
        if ((match = message.match(/^!secret (\w+)$/))) {
          targetUsername = match[1];
          console.log(`Now secretly chatting with ${targetUsername}`);
        } else if (message.match(/^!exit$/)) {
          console.log(`No more secretly chatting with ${targetUsername}`);
          targetUsername = "";
        } else {
          if (targetUsername) { // !!!!!!!!!!!!!!!!
            // Encrypt the message for the target user
            const targetPublicKey = users.get(targetUsername);
            if (targetPublicKey) {
              const encryptedMessage = crypto.publicEncrypt(
                targetPublicKey,
                Buffer.from(message)
              );
              socket.emit("message", {
                username,
                message: encryptedMessage.toString("base64"),
                targetUsername: targetUsername,
                isSecret: true,
              });
            } else {
              console.log(`[Error] ${targetUsername} not found.`);
            }
          } else {
            // Broadcast plaintext message
            socket.emit("message", { username, message, targetUsername: "", isSecret: false });
          }
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
  const { username, publicKey} = data;
  users.set(username, publicKey);
  console.log(`${username} join the chat`);
  rl.prompt();
});

socket.on("message", (data) => { // !!!!!!!!!!!!!!!!
  const { username: senderUsername, message: senderMessage, isSecret, targetUsername } = data;
  if (isSecret && targetUsername === username) {
    // Decrypt the message if it's meant for the current user
    const decryptedMessage = crypto.privateDecrypt(
      senderPrivateKey,
      Buffer.from(senderMessage, "base64")
    );
    console.log(`[Secret] ${senderUsername}: ${decryptedMessage.toString()}`);
  } else if (senderUsername !== username && isSecret) {
    // Public message (secret)
    console.log(`${senderUsername}: ${senderMessage}`);
  } else if (senderUsername !== username){
    // Public message (normal)
    console.log(`${senderUsername}: ${senderMessage}`);
  }
  rl.prompt();
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