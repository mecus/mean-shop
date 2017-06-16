
var dbConnect = function(mongoose){
    let path = 'mongodb://127.0.0.1:27017/nodeDB';
    mongoose.connect(path);
    let db = mongoose.connection;
    db.on('error',function(err){console.log(err)});
    db.once('open', function() {
        console.log(`
        DATABASE_CONNECTION: TRUE!
        DATABASE_PATH: ${path}
        CONNECTION_TIME: ${new Date}
        `)
    });
}
module.exports = dbConnect;





