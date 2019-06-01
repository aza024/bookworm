// server.js
const express = require('express');
const app = express(); 

app.get('/',(req, res) => res.send('hello'))

const server = app.listen(3000);