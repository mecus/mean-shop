var express = require ('express');
var start_app     = require ('./backend-server/app');
var http    = require ('http');


var success = function(){
    // console.log(process.env);
    console.log(`
        SERVER: Listening on port: ${start_app.get("port")}}...
        ENVIRONMENT: ${process.env.NODE_ENV}
    `);
    return;
}


var server = http.createServer(start_app);

server.listen(start_app.get("port"));
server.on('error', function(){console.log('something bad happened')});
server.on('listening', success );