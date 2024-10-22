const io = require("socket.io-client");
const readline = require("readline");
const { read } = require("fs");

const socket = io("http://localhost:3000");

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
                socket.emit("message", {username, message}); // emit = untuk mengirimkan pesan melalui web socket
            }
            rl.prompt();
        });
    });
});

socket.on("message", (data) => { 
    const { username: senderUsername, message: senderMessage } = data; // data isinya username sm message

    if(senderUsername != username) {
        console.log(`${senderUsername}: ${senderMessage}`);
        rl.prompt();
    }
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