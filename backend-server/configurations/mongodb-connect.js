
var dbConnect = function(mongoose){
    let path = process.env.MONGODB_URL;
    mongoose.connect(path);
    let db = mongoose.connection;
    db.on('error',function(err){console.log(err.message)});
    db.once('open', function() {
        console.log(`
        DATABASE_CONNECTION: TRUE!
        DATABASE_PATH: ${path}
        CONNECTION_TIME: ${new Date}
        `)
    });
}
module.exports = dbConnect;





