var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
require('dotenv').config();
console.log(process.env)

var app = express();

var mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache',mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/list',(req,res)=>{
    res.render('list');
});

app.get('/bookform',(req,res)=>{
    res.render('book-form');
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}.`);
});