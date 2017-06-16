var express = require ('express');
var start_app     = require ('./backend-server/app');
var http    = require ('http');
require('dotenv').config();

// var chokidar = require('chokidar');
// var watcher = chokidar.watch('./backend-server');
// watcher.on('ready', function() {
//   watcher.on('all', function() {
//     console.log("Clearing /dist/ module cache from server");
//     Object.keys(require.cache).forEach(function(id) {
//       if (/[\/\\]backend-server[\/\\]/.test(id)) delete require.cache[id]
//     });
//   });
// });

var success = function(){
    // console.log(process.env);
    console.log(`SERVER: Listening on port: ${start_app.get("port")}}...`);
    return;
}


var server = http.createServer(start_app);

server.listen(start_app.get("port"));
server.on('error', function(){console.log('something bad happened')});
server.on('listening', success );