// server.js
const express = require('express');
const app = express(); 
const https = require('https');


app.use(express.static('public'));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',(req, res) => res.sendFile(__dirname + '/views/index.html'))


app.get('/data', (req, res) => {
    console.log('REQ', req.body)
    // console.log('res', res)
    // https://www.goodreads.com/book/show.FORMAT 

    https.get("https://www.goodreads.com/search.xml?key=uVqg3ZC0UsJJEJxchI4Udg&q=Ender%27s+Game", (res) => {
    console.log('res', res.body)
    })
})



const server = app.listen(3000);