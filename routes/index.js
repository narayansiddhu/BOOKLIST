var express = require('express');
var router = express.Router();
const { Client } = require('pg');
const path = require('path');

router.get('/books',(req,res)=>{
    const client = new Client();
    client.connect()
    .then(()=>{
      return client.query('SELECT * FROM books;');
    })
    .then((results)=>{
     console.log('results?',results);
     res.render('book-list');
   })
    .catch(err=>{
      console.log('error',err);
  });
});
router.get('/addbook',(req,res)=>{
    res.render('book-form');
})
router.post('/addbook',(req,res)=>{
    console.log('post body ', req.body);
    const client = new Client();
    client.connect().then(()=>{
        // console.log('connection completed');
        const sql = 'INSERT INTO books (title, authors) VALUES ($1, $2)'
        const params =[req.body.title, req.body.authors];
        return client.query(sql,params)
    })
    .then((result)=>{
        console.log('result?',result);
        res.redirect('/list');
    }).catch((err) =>{
        console.log('err',err);
        res.redirect('/book-list');
    });
});
module.exports = router;