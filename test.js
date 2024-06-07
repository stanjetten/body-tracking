const keysender = require('node-key-sender')
setTimeout(() => {
    keysender.sendKey("right")
    keysender.sendKey("right")
    keysender.sendKey("right")
    console.log("sent!")
}, 2000);