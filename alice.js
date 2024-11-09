const crypto = require("crypto");

const alicePrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0z4Gc4cKZ3aTE
DwDudbRcEFG9H3n6rDqwYKjFmPsfmYEEquX7ePJm4U1M0deB6HlWBoudA12Vi3SO
VTZnqAede55lWfufrNff4BQD7nVuJu2e3ytBywJIXyq6hhuYPvcLc6zhb8jv4SdQ
pm3sEQM4VtfqOv9Uluh2U8O+8JJyblZTKHnZvhDO54J9NIg7zKzU5OeRJplgNS/1
RiFHAwHRXaGLMkz23jpTy2fZyrUnx7eILQ86vd3QAPGkReT2y66Tpa6xI3tvwXsG
ejWEEOTtPzgACC/3l0SSlVtaxwIMiWe8gd7zUn5Suq+yWSpP0SMJE6q8XOTGXl1k
DsJz1eDzAgMBAAECggEACXQR+ERbetT6UN/h8hXIXMnjpCo5o/AOT3t2R4KEmrXZ
Z4eR57B+p/9encYY6OthMKy97vMmmPOGIAz3f7rqzwKQGQd33vTYApYCJeR5Uk2J
vfU4G0QEdgk3wDHTzoV4QCqHnu/LxzLz7cUN2TpYe0EbH91+zQro04r0oI6OcZoZ
rRqZbJkbJR5Q4l+9iMRWSiZcsNeqX6NXhsNk3Ez9t7Ofrm+uuLHZc2loXFrTs/X2
VehH1W0Jore16knDKJVxoIfjVIJ9sc+nhTfkagMlJYK5qvCR+EHBLoeQeCEdXAE0
U3MwQSw3KbftmAuOmrKgrNU+x9Byf+dL3MFaOWca5QKBgQDnu+JBWU+1ffrwz6A+
xFEdiPFAvZlluoyayg9e4kyFK+NgDEwgbho6H6cdbjTvm7boRByS42R4SAs6QKVd
Bd4B/79W+6ngY8Qhu2BC8/vWUn2YMMamWffkStDT1O7Mig0j35rZVZNAnqXt324O
JX4EWvuXTNQO7jJREH/SqSVCLQKBgQDHvoPH+JC+SuAXjCLrLgzx17BZJe6cG9+1
LMnurtaJcfAyeWFvyLaw88nBykSq7aB+4r5cA07bjoIzta9KY91ol4WtCZOXEIVf
zYRwdZetxDGRCqvlhi8DndE7AON9yNJiEoHPPIMJHHvpKWLTFAGBtqeNLJNiM6Jy
Td08duBDnwKBgGQsOdAZ9XT1MobqmdDIOHBWBEQCMc9h5un6ss5HcOCYaj/Y0Qer
0LaTfEAipct2OokI+Hkexw2fxwq1a0ZdBO1ESsglHfgb6GrUfvYyVgj9u8EQRK8g
cSJEnSUVBO1yN9/sBxov/emPKxc64G5JEsJ7OgrbcUfK/AFC6p5789k5AoGAIStW
8OcrCh6e9eoUhl9gUOzTYQp2hD/wt0JXyiYIhEyCaa9Uad63z8y8DU1Md+H8C/YV
TGxUNQuGPZYHJOBOjSbUUPbNJoHc1Brpyk8MwBNbc82E3BmbRwt3CkhMfr/Rh+2w
1rwiummbfg2cVpb05Rhy3HOxidYvPLIHchn/hdsCgYBNOrd5tccknBVDDQw04Xoz
IjsFytkRcvn0WfrvcOqb/24jWQMPrWBMnOvD8gf49hILTh3xD0vjuJzjz0B5w7qt
DS1inPrzWiGqBhwmyB8zTV6EQ/DG3duTh+6zGaFmf0jTaroLWzb9rOVER8A5PaVD
4S1HPbwtq1EHC38Bi1OgeA==
-----END PRIVATE KEY-----`;

const alicePrivateKey = crypto.createPrivateKey(alicePrivateKeyPem);
/**
 * The SENDER PRIVATE KEY must be kept securely.
 * No one else should know about this PRIVATE KEY.
 * Meanwhile, the PUBLIC KEY can be shared to others.
 * In this case, the RECIPIENT should know about this SENDER PUBLIC KEY.
 */

const bobPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw5iwwMARQw5oiINhbeV+
vzZzpAKvYCVLC13rFDdL8P/L7oXrunpA/paMPV7v/Wdu5M9I1LpUQljLz7xNEszn
pglauX4fNtrD68nt0RURR+9SYmbmptjHgCF8w1SWaiN/hzsrJqOTK5vZ+nWMrSvi
9iBzER6Q5xYv+EtksH8Z+qCV5K7yZtdB/61dkEakN2X5N+kiE0YgG/NnWa/eP3tl
equGLc0a3O4W6uuhc8f5o92LqNdQplNbuhwCsg+ocfVqvphRnLk1Sk8oiU9UWatS
jT6+vHkJ7AfMBLgte+GQt9Op1VwZ3PJmtNqSP2tsEAnE7pgLvLDbrIO/KQ0GhPKp
1wIDAQAB
-----END PUBLIC KEY-----`;
const bobPublicKey = crypto.createPublicKey(bobPublicKeyPem);

const message = "I want some apples";
const data = Buffer.from(message);

const signature = crypto.sign("sha256", data, alicePrivateKey);
console.log("Signature:", signature.toString("hex"));

const ciphertext = crypto.publicEncrypt(bobPublicKey, data);
console.log("Message:", ciphertext.toString("hex"));