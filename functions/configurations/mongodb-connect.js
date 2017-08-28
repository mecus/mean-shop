const winston         = require('winston');

var dbConnect = function(mongoose){
    let PATH = process.env.MONGODB_URL;
    let options = {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        server: {
            socketOptions: {
                socketTimeoutMS: 0,
                keepAlive: true
            },
            reconnectTries: 50
        }
    }
    mongoose.connect(PATH, options).then(function(){
        console.log(`
        DATABASE_CONNECTION: TRUE!
        DATABASE_PATH: ${PATH}
        KEEP_ALIVE: ${options.server.socketOptions.keepAlive}
        RECONNECT_TRIES: ${options.server.reconnectTries}
        CONNECTION_TIME: ${new Date}
        `);

    },
    (err)=>{
        if(err){
            winston.log('error', err.message)
            // console.log(`
            // Connection Error: ${err.message}
            // `);
        }
    });
}
module.exports = dbConnect;





