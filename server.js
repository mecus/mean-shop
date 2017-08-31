var express = require ('express');
var start_app     = require ('./functions/index');
var http    = require ('http');


var success = function(){
    // console.log(process.env);
    console.log(`
        SERVER: Listening on port: ${start_app.get("port")}...
        ENVIRONMENT: ${process.env.NODE_ENV}
    `);
    return;
}


var server = http.createServer(start_app);

server.listen(start_app.get("port"));
server.on('error', function(err){
    console.error(`
    Handled Error: True
    Stack: ${err.stack}
    `);
});
server.on('uncaughtException', (err)=>{
    console.log(`
    This is Unhandled error: True
    Error: ${err}
    `)
})
server.on('listening', success );