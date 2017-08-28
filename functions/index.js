const functions       = require('firebase-functions');
const express         = require('express');
const bodyParser      = require('body-parser');
const expressGraphql  = require('express-graphql');
const Schema          = require('./graphql-endpoints/graphqlSchema');
const path            = require('path');
// const errorHandler    = require('errorHandler');
const cookieParser    = require('cookie-parser');
const session         = require('express-session');
const flash           = require('express-flash');
const cors            = require('cors');
const fs              = require('fs');
const mongoose        = require('mongoose');
const multer          = require('multer');
const uploadForm      = multer();
// var upload          = multer({dest: __dirname+'../src/express-assets/uploads'});
const cloudinary      = require('cloudinary');
const expressValidator = require('express-validator');
const passport        = require('passport');
const mongoStore      = require('connect-mongo')(session);
const braintree       = require('braintree');
const winston         = require('winston');//make use of it later

//Require Configurations
const dbConnect       = require('./configurations/mongodb-connect');
const userAuthentication   = require('./configurations/passportAuthentication');
const {
        clientRegistration, clientToken, clients,
        secureApiRoute
        } = require('./configurations/passportJwtAuth');

//File imports
const productsController= require('./controllers/products');
const adminIndex      = require('./controllers/admin-index');
const uploader        = require('./controllers/uploader');
const department      = require('./controllers/department');
const category        = require('./controllers/category');
const orders          = require('./controllers/orders');
const customers       = require('./controllers/customers');
const subCat          = require('./controllers/sub-category');
const advert          = require('./controllers/advert');
const youtube         = require('./controllers/youtube');

//Api imports
const storeDataApi    = require('./api/v1/stores/store-back-end');
const productApi      = require('./api/v1/stores/product.route');
const categoryApi     = require('./api/v1/stores/category.route');
const departmentApi   = require('./api/v1/stores/department.route');
const youtubeApi      = require('./api/v1/stores/youtube.route');
const paymentApi      = require('./api/v1/payment/checkout');
const accountApi      = require('./api/v1/customers/account.route');
const customerApi     = require('./api/v1/customers/address.route');
const { 
    getOrder, createOrder, 
    getOrderItemList,
    createOrderItemList } = require('./api/v1/stores/order.route');
require('dotenv').config({path: '.env'});

const app     = express();
const api     = express();
const admin   = express();

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
if(process.env.NODE_ENV == "development"){
    app.use(session({
        secret: process.env.SECRET_KEY,
        // cookie: {maxAge: 60000},
        resave: false,
        saveUninitialized: false,
        // storing session in the mongo database
        store: new mongoStore({
            url: process.env.MONGO_SESSION_URI,
            autoReconnect: true
        })
    }));
}

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
app.get('/admin/registration', userAuthentication.registration);
app.post('/admin/registration/new', userAuthentication.registered);
app.get('/admin/login', userAuthentication.logIn);
app.post('/admin/login', userAuthentication.loggedIn);
app.get('/admin/logout', userAuthentication.logOut);
// app.post('/admin/login', passport.authenticate('local',
//   { successRedirect: '/admin/dashboard', failureRedirect: '/admin/login', failureFlash: true })
// );


//GraphQl Endpoints
app.use('/graphql', expressGraphql({
    schema: Schema,
    graphiql: process.env.NODE_ENV === "development"
}));

// winston.log('info', 'Hello distributed log files!');
// winston.info('Hello again distributed logs');

//API ROUTES
api.get('/v1/stores/storedata', storeDataApi.getStoreData);
api.get('/v1/stores/storeadvert', storeDataApi.getStoreAd);
api.get('/v1/stores/products', productApi.getProducts);
api.get('/v1/stores/products/query', productApi.getQueryProducts);
api.get('/v1/stores/products/:id', productApi.getProduct);
api.get('/v1/stores/category/:id', categoryApi);
api.get('/v1/stores/departments', departmentApi);
api.get('/v1/stores/youtube', youtubeApi);
api.get('/payment/checkout', paymentApi.getToken);
api.get('/payment/checkout/card', paymentApi.fetchCard);
api.get('/payment/customer/:id', paymentApi.getCustomer);
api.post('/payment/transaction', paymentApi.postTransaction);
api.post('/payment/checkout', paymentApi.postCustomer);
api.get('/v1/customers/account/:id', accountApi.getAccount);
api.post('/v1/customers/account', accountApi.postAccount);
api.put('/v1/customers/account/:id', accountApi.updateAccount);
api.get('/v1/customers/address/:id', customerApi.findAddress);
api.post('/v1/customers/address', customerApi.createAddress);
api.delete('/v1/customers/address/:id', customerApi.deleteAddress);
api.put('/v1/customers/address/:id', customerApi.updateAddress);
api.get('/v1/stores/orders/:id', getOrder);
api.post('/v1/stores/orders', createOrder);
api.get('/v1/stores/orders/items/:id', getOrderItemList);//note check later
api.post('/v1/stores/orders/items', createOrderItemList);//note check later
//Client Side User Route
api.post('/authentication/clients', clientRegistration);
api.post('/authentication/client_token', clientToken);
api.get('/authentication/clients', secureApiRoute, clients);
app.use('/api', api);

//Express Inhouse route
app.get('/admin/dashboard', userAuthentication.isAuthenticated, adminIndex)
app.get('/admin/product/new/:id', productsController.productform);
app.get('/admin/products', userAuthentication.isAuthenticated, productsController.showProducts);
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
app.get('/', userAuthentication.isAuthenticated, adminIndex);
// users.isAuthenticated


module.exports = app;
// module.exports.server = functions.https.onRequest(app);
