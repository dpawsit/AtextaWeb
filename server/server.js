const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const database = require('../database/config.js')
const port = process.env.PORT || 3000;

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../app/public')));

const router = require('./router.js')(app);


database.sync()
.then(res => {
  app.listen(port, function(){
    console.log('Listening on localhost:', port);
  })
})
.catch(error => {
  console.log('Database did not sync: ', error);
})