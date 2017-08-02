
var dbConnect = function(mongoose){
    var options = {
        useMongoClient: true,
        server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
    }
    let path = process.env.MONGODB_URL;
    let dbUrl = "mongodb://root:password@ds129593.mlab.com:29593/storedb";
    mongoose.connect(dbUrl);
    let db = mongoose.connection;
    db.on('error',function(err){console.log(err.message)});
    db.once('open', function() {
        console.log(`
        DATABASE_CONNECTION: TRUE!
        DATABASE_PATH: ${dbUrl}
        CONNECTION_TIME: ${new Date}
        `)
    });
}
module.exports = dbConnect;





