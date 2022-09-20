const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie in passport js
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo'); // to make session persistent, storing it in mongoStore

// SCSS is new way of writing css
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//Middleware to encode post request URL
app.use(express.urlencoded());

//Middleware to use cookies
app.use(cookieParser());


//Use Css, JS, Images from assets directory
app.use(express.static('./assets'));

//Use express layouts
app.use(expressLayouts);

//Extract styles and scripts from body of sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use ejs view engine and set directory containing views to /views
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial', //it will creeate a cookie named codeail
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething', //key used to encrypt cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //in miliseconds
    },
    //MongoStore is used to store cookies in the db
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log( err || 'connect-mongoDB setup ok');
    }        
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
        return;
    }

    console.log(`Server is running on port: ${port}`); //Interpolation: another way of including variables in string
});