const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const database = require('../database/config.js')
const helmet = require('helmet');
const util = require('./server_util');
const port = process.env.PORT || 3000;

const app = express()

app.use(session({
  secret: '0283yr0n203cr2029784ty0g89new',
  cookie : {
    maxAge : 300000
  },
  resave : false,
  saveUninitialized : false,
}))

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.all('*', util.checkUser);
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

