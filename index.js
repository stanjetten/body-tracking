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
let currentlane = 1
let lastv = 0
server.on("connection", socket => {
  socket.on("message", (msg) => {
      const datapacket = JSON.parse(msg.toString())
      if (datapacket.lane != currentlane) {
        if (currentlane > datapacket.lane) {
          ks.sendKey("left")
        } else if (currentlane < datapacket.lane) {
          ks.sendKey("right")
        }
        currentlane = datapacket.lane
      }
      if (lastv+100 < new Date().getTime()) {
        if (datapacket.jump) {
          lastv = new Date().getTime()
          ks.sendKey("up")
        } else if (datapacket.crouch) {
          lastv = new Date().getTime()
          ks.sendKey("down")
        }
      }

  })
})