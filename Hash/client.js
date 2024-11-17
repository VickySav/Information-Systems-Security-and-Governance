const io = require("socket.io-client");
const readline = require("readline");
const { read } = require("fs");

const socket = io("http://localhost:3000");
const crypto = require('crypto');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

let username = "";

socket.on("connect", () => { // untuk koneksi ke server
    console.log("Connected to the server");

    rl.question("Enter you username: ", (input) => {
        username = input;
        console.log(`Welcome, ${username} to the chat`);
        rl.prompt();

        rl.on("line", (message) => { // untuk check dia tken enter, message diisi dgn apa yg diketik user
            if (message.trim()) {
                const hashMsg = crypto.createHash('sha256').update(message).digest('hex');

                socket.emit("message", {username, message, hash: hashMsg}); // emit = untuk mengirimkan pesan melalui web socket
            }
            rl.prompt();
        });
    });
});

socket.on("message", (data) => { 
    const { username: senderUsername, message: senderMessage, hash: hashValidate } = data; // data isinya username sm message
    if (senderUsername != username){
        const hashMessage = crypto.createHash('sha256').update(senderMessage).digest('hex');
        if (hashMessage === hashValidate) {
            console.log(`${senderUsername}: ${senderMessage}`);
        }
        else {
            console.log(`${senderUsername}: ${senderMessage}` );
        }
    }
    rl.prompt();
});

socket.on("disconnect", () => { // kl disconnect event ini ke trigger muncul prompt dibwh
    console.log("Server disconnected, Exiting...");
    rl.close();
    process.exit(0);
});

rl.on("SIGINT", () => { // kalau tken control c menutup server
    console.log("\nExiting...");
    socket.disconnect();
    rl.close();
    process.exit(0);
})