const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const routes = require('./routes/index');
require('dotenv').config();
// console.log(process.env)
const app = express();
//template engine
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache',mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//home routing
app.use('/',routes);
//listening
app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}.`);
});