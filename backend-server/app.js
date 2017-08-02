var express         = require('express');
var bodyParser      = require('body-parser');
var path            = require('path');
var errorHandler    = require('errorHandler');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var flash           = require('express-flash');
var cors            = require('cors');
var fs              = require('fs');
var mongoose        = require('mongoose');
var multer          = require('multer');
var uploadForm      = multer();
// var upload          = multer({dest: __dirname+'../src/express-assets/uploads'});
var cloudinary      = require('cloudinary');
var expressValidator = require('express-validator');
var passport        = require('passport');
var mongoStore      = require('connect-mongo')(session);
var braintree       = require('braintree');

//Require Configurations
var dbConnect       = require('./configurations/mongodb-connect');
var authConfig      = require('./configurations/passportAuthentication');

//File imports
var productsController= require('./controllers/products');
var adminIndex      = require('./controllers/admin-index');
var uploader        = require('./controllers/uploader');
var department      = require('./controllers/department');
var category        = require('./controllers/category');
var orders          = require('./controllers/orders');
var customers       = require('./controllers/customers');
var users    = require('./controllers/users');
var subCat      = require('./controllers/sub-category');
var advert          = require('./controllers/advert');
var youtube         = require('./controllers/youtube');

//Api imports
var storeDataApi    = require('./api/v1/store-back-end');
var productApi      = require('./api/v1/product.route');
var categoryApi     = require('./api/v1/category.route');
var departmentApi      = require('./api/v1/department.route');
var youtubeApi      = require('./api/v1/youtube.route');
var paymentApi      = require('./api/payment/checkout');
var accountApi      = require('./api/v1/account.route');

require('dotenv').config({path: '.env'});

var app     = express();
var api     = express();
var admin   = express();

// let logStream = fs.createWriteStream(path.join(__dirname, '../../logger.log'),{flags: 'a'});
//making Connection to the Mongo Database
dbConnect(mongoose);

//setting app middlewares
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "./assets")));//Need to be changed to public

//Implementing Body-Parser
//Set Cors Options Later
app.use(cors());
// app.use(loger('combined', {stream: logStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(uploadForm.array());
app.use(cookieParser());

//Express-session for development only
app.use(session({
    secret: process.env.SECRET_KEY,
    // cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
    // storing session in the mongo database
    store: new mongoStore({
        url: process.env.MONGO_URI,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
//   console.log('This is Log user:' +req.user);
    //  console.log("Authenticated: "+req.isAuthenticated());
  next();
});
app.use(function(req, res, next){
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== "/admin/login" &&
      req.path !== "/admin/registration/new"){
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == "/admin/dashboard") {
      req.session.returnTo = req.path;
  }
  next();
});

//User Authentication and Registration
app.get('/admin/registration', users.registration);
app.post('/admin/registration/new', users.registered);
app.get('/admin/login', users.logIn);
app.post('/admin/login', users.loggedIn);
app.get('/admin/logout', users.logOut);
// app.post('/admin/login', passport.authenticate('local',
//   { successRedirect: '/admin/dashboard', failureRedirect: '/admin/login', failureFlash: true })
// );

//API ROUTES
api.get('/v1/storedata', storeDataApi.getStoreData);
api.get('/v1/storeadvert', storeDataApi.getStoreAd);
api.get('/v1/products', productApi.getProducts);
api.get('/v1/products/query', productApi.getQueryProducts);
api.get('/v1/products/:id', productApi.getProduct);
api.get('/v1/category/:id', categoryApi);
api.get('/v1/departments', departmentApi);
api.get('/v1/youtube', youtubeApi);
api.get('/payment/checkout', paymentApi.getCheckout);
api.get('/v1/account/:id', accountApi.getAccount);
api.post('/v1/account', accountApi.postAccount);
api.patch('/v1/account/edit/:id', accountApi.updateAccount);
app.use('/api', api);

//Express Inhouse route
app.get('/admin/dashboard', users.isAuthenticated, adminIndex)
app.get('/admin/product/new/:id', productsController.productform);
app.get('/admin/products', users.isAuthenticated, productsController.showProducts);
app.post('/admin/products/submit', productsController.postProduct);
app.get('/admin/product/edit/:id', productsController.editProduct);
app.post('/admin/product/update/:id', productsController.updateProduct);
app.delete('/admin/products/:id', productsController.removeProduct);
app.get('/admin/product/:id', productsController.viewProduct);

app.post('/admin/upload', uploader.imageUpload);

app.get('/admin/store', department.getDept);
app.post('/admin/dept', department.postDept);
app.delete('/admin/dept/:id', department.deleteDept);
app.get('/admin/dept/:id', department.editDept);
app.post('/admin/store/:id', department.updateDept);

// Advert Section
app.get('/admin/advert/:id', advert.getAd);
app.post('/admin/advert', advert.saveAd);
app.delete('/admin/ad/:id', advert.removeAd);

// General Advert
app.get('/admin/advertise', advert.getGAd);
app.post('/admin/advertise', advert.saveGAd);

//Youtube Section
app.get('/admin/youtube', youtube.getYoutube);
app.post('/admin/youtube', youtube.saveVideo);
app.get('/admin/youtube/del/:id', youtube.deleteVideo);

app.post('/admin/cat', category.postCategory);
app.get('/admin/category/:id', category.getCategory);
app.delete('/admin/cat/:id', category.deleteCategory);

app.get('/admin/subcat/add/:id', subCat.getSubCategory);
app.post('/admin/subcat/add', subCat.postSubCategory);
app.delete('/admin/subcat/:id', subCat.deleteSubCategory);

app.get('/admin/orders', orders.getOrders);

app.get('/admin/customers', customers.getCustomers);

//Handling all incoming and outgoing request and responds
app.get('/*', users.isAuthenticated, adminIndex);


//Error Handler, Need to set the environment
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

module.exports = app;
