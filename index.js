const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

//Use express layouts
app.use(expressLayouts);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
        return;
    }

    console.log(`Server is running on port: ${port}`); //Interpolation: another way of including variables in string
});