const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const { Client } = require('pg');
require('dotenv').config();

// console.log(process.env)

const app = express();

const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache',mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/list',(req,res)=>{
    res.render('list');
});

app.get('/addbook',(req,res)=>{
    res.render('book-form');
})

app.post('/addbook',(req,res)=>{
    console.log('post body ', req.body);
    const client = new Client();
    client.connect().then(()=>{
        console.log('connection completed');
        const sql = 'INSERT INTO books (title, authors) VALUES ($1, $2)'
        const params =[req.body.title, req.body.authors];
        return client.query(sql,params)
    })
    .then((result)=>{
        console.log('result?',result);
        res.redirect('/list');
    }).catch((err) =>{
        console.log('err',err);
        res.redirect('/list');
    });
  });

app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}.`);
});