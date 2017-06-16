var express         = require('express');
var bodyParser      = require('body-parser');
var path            = require('path');
var errorHandler    = require('errorHandler');
var cookieParser    = require('cookie-parser');
var cors            = require('cors');
var indexController = require('./controllers/index');
var productApi      = require('./api/v1/product.route');
var fs              = require('fs');
var dbConnect       = require('./configurations/mongodb-connect');
var mongoose        = require('mongoose');


var product        = require('./api/v1/product.route');


let app     = express();
let api     = express();

// let logStream = fs.createWriteStream(path.join(__dirname, '../../logger.log'),{flags: 'a'});
//making Connection to the Mongo Database
dbConnect(mongoose);
//setting app middlewares
app.set("port", process.env.PORT || 3000);
// app.set('views', path.join(__dirname, '../../views'));
// app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "../src")));
//Implementing Body-Parser
//Set Cors Options Later
// app.use(cors());
// app.use(loger('combined', {stream: logStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//API ROUTES
api.get('/v1/products', product.getProducts);

app.use('/api', cors(), api);

//Handling all incoming and outgoing request and responds
app.get('/*', indexController);

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

module.exports = app;