const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

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


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething', //key used to encrypt cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //in miliseconds
    }
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