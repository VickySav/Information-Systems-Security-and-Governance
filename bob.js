const crypto = require("crypto");

const bobPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDDmLDAwBFDDmiI
g2Ft5X6/NnOkAq9gJUsLXesUN0vw/8vuheu6ekD+low9Xu/9Z27kz0jUulRCWMvP
vE0SzOemCVq5fh822sPrye3RFRFH71JiZuam2MeAIXzDVJZqI3+HOysmo5Mrm9n6
dYytK+L2IHMRHpDnFi/4S2Swfxn6oJXkrvJm10H/rV2QRqQ3Zfk36SITRiAb82dZ
r94/e2V6q4YtzRrc7hbq66Fzx/mj3Yuo11CmU1u6HAKyD6hx9Wq+mFGcuTVKTyiJ
T1RZq1KNPr68eQnsB8wEuC174ZC306nVXBnc8ma02pI/a2wQCcTumAu8sNusg78p
DQaE8qnXAgMBAAECggEACK73Ld95BLaXinP2t9fH7DpBIQdjfMu7DKqjPJcF3pGk
npbAc9tolkTdvf3AfsoAQNU5AQSyp+1kQvkznMGPCS6CIhkIzrkgmI+y6KTcSwrD
aA30cHTQSo5yCQPw145y43CLhmAdsQJux3E/iRKZNV8UbK6kNTYldAr40eMapqc1
j5IjnM+YVfVgxjhLeKiZgZRzRxUq6z2N00aQ8zBafDbTmr0e+dA4Ywwa+smD4u6X
aSkaogug5T5XuX2ASOvlibH7POXdpzVffgZusylcy1zDS+WsM5QsSJJ/tlR8lc3l
UE9MizEeH8ch1c9oYjIalbSw2mukCekbrTVlFnpUUQKBgQDmxF/2BAVCYuFD2QIr
kZolYHly83VCN1Lb0K0BBDF9LyWh7BuytjBRPmSVl2FeD8btp1dKOu0bH5InNH/9
iMNEU8O2IIkYu+3vAbuqgaGdODG0Ibis4P7x9AsYR2kTVAgCkYFyBbrz4pMx+qa8
HxiM5fJpUBTwLgJAchdrjgjvpwKBgQDY+9Hwd9TB1yiCzvlbZVbKGmYP3SBGhLkW
e48CNTwfPMH1ilnXHAiWiHQJ5AMfWDb3bFDWf0L5ehgXmckOKvNf3XoHrTAbZ+IF
XKU9vioA8BSBoz60ew3KjsgR66S2Bzv1jlNjNg2VJVELdCDWVrN4i6Lm0yi/aGh0
b67hlfU6UQKBgCcFidyF7YW+Rq08YtuPMWuklqTTej6KMF6vOLH1TZEHieuJi116
5Uy3qjaJdJN9Q3woUeBhenqdqg8rF4F9wNcq+usvMT+Xd7J0rpE0fmmhePYmxZ2m
JjYvuDiQyrnT+c7FYAgx490dsRpAcjVZZMNeltEsE35RqVvQbxlm2Sf9AoGAM0na
xu9cP/FepwTLVjou+Jii1U8caO7IXTMZi5kPvAZ9hk+MitcahJJ+czQNNOSCIZvd
w8XTC+s7NKDqMEoguuE8DgJ245N7jm7mtCB2B0C4aCgxEzIfAWkci3fauBgfqRxa
Q5IsRbvLW1y4wlE+HNlMySjSceP5BMS9Xp82lvECgYABvfaSf2ff1JdSDfnxRESX
8DRPOzMxgGNMSvf8DLv812wCydkLODoObKMk2X0RZ15LFddoyPYgpAPo3vBYClu4
lBxuoINrnKPZ7d5XUM0BJIZcsQ50dQQYayR6kZ2a2MYqIqtstnjp7GKQSK9vtVcR
5BK+MV/40X1DMqfPMlByUw==
-----END PRIVATE KEY-----`;
const bobPrivateKey = crypto.createPrivateKey(bobPrivateKeyPem);
/**
 * The SENDER PRIVATE KEY must be kept securely.
 * No one else should know about this PRIVATE KEY.
 * Meanwhile, the PUBLIC KEY can be shared to others.
 * In this case, the RECIPIENT should know about this SENDER PUBLIC KEY.
 */

const alicePublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtM+BnOHCmd2kxA8A7nW0
XBBRvR95+qw6sGCoxZj7H5mBBKrl+3jyZuFNTNHXgeh5VgaLnQNdlYt0jlU2Z6gH
nXueZVn7n6zX3+AUA+51bibtnt8rQcsCSF8quoYbmD73C3Os4W/I7+EnUKZt7BED
OFbX6jr/VJbodlPDvvCScm5WUyh52b4QzueCfTSIO8ys1OTnkSaZYDUv9UYhRwMB
0V2hizJM9t46U8tn2cq1J8e3iC0POr3d0ADxpEXk9suuk6WusSN7b8F7Bno1hBDk
7T84AAgv95dEkpVbWscCDIlnvIHe81J+UrqvslkqT9EjCROqvFzkxl5dZA7Cc9Xg
8wIDAQAB
-----END PUBLIC KEY-----`;
const alicePublicKey = crypto.createPublicKey(alicePublicKeyPem);

const ciphertextHex = "b28ab40ae1e9daf3848c4d9a83f972bcc4e969bc3096311ac326f64446e725f4bf732106c448812b1a03899d3c50d3ed0e104d2abf8564da41eba7fc2d803898f9d41efe638d5e561775b3e880009a4bde683580fe7023189afb5f1a26f1c04d68d30ae446aa8607b389eec5e29d62b736b83b042f3d4315155045cb3ffb7d1c0f71c52c01b1f00e6302ceef71aed7929bfc126271e86b6760f44499c86e7d4ef45d861e35df3e6f8a1f7a8349fc7d7d3fbe2571c116816980d48ee9efe6d5a92d1263cad6366fe517bcad62402b044377c9005e2d21b5891338dfa6496b1cf557955ffe2ce759047939a86c93c0a2f832bba1b3acb81c19bb4150d770095e16";
const ciphertext = Buffer.from(ciphertextHex, "hex");

/**
 * Then, the RECIPIENT obtains MESSAGE and SIGNATURE
 * from the communication with the SENDER
 */
const signatureHex = "040245cb9aee0fa9f562160d192d5dac0a8c6cbb01c7d58baeab7cd84d28485ee78280c16f937c43c2c1ccfa1b5b9f9355ee14b70c16d94bf86548e5e967feb1c4421912f6bbc66bcb9a53bc8d84c35491e8b925eef4f4705ca1153fcc59259d293b0e59bbf802d18aa2cf649b592de868b4cf86e0fa20ea6089655cc7ccad2e3987dc49731cb1d81fbba296eaf2ef245a14bd884e60e7de14660c1d96d421e6c962f69184d9c9826486bebf665559b6be36403dfedb33818ecd74e0a89f75856aee58ff856a629babbee7e034d7e73bc3464af9391fe01add16e260cdff4d07dea906492bd0ec83c60865113968acf956854f93d0ca1845d0e4c2068cab9b70";
const signature = Buffer.from(signatureHex, "hex");

const recoveredPlaintext = crypto.privateDecrypt(bobPrivateKey, ciphertext);
const message = recoveredPlaintext.toString("utf8");

// RECIPIENT verifies SIGNATURE
const data = Buffer.from(message);
const isValid = crypto.verify("sha256", data, alicePublicKey, signature);

// Results
console.log("Signature Verification:", isValid);
console.log("Message:", message);