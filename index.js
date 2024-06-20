var http = require('http');
var fs = require('fs');
const ks = require('node-key-sender');
http.createServer(function (req, res) {
  fs.readFile('tm.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(3000);


const WebSocket = require("ws")
const server = new WebSocket.Server({port: 8080})
let gamesocket
server.on("connection", socket => {
  socket.send("connected!")
  console.log("client connected!")
  socket.on("message", (msg) => {
      if (msg.toString() == "GAMESOCKET") {gamesocket = socket; return}
      const numb = parseFloat(msg.toString())
      console.log(numb)
        gamesocket?.send(Math.round((6.2-numb*2.4)*100000))
  })
})