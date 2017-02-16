const express = require('express');
const router = express.Router();
const userController = require('../../database/controllers/user_controller');
const Promise = require('bluebird');
const https = require('https');

const authenticateUser = (token) => {

  return new Promise ((resolve, reject) => {
  var options = {
  "method": "GET",
  "hostname": "rakan.auth0.com",
  "port": null,
  "path": "/userinfo",
  "headers": {
    "authorization": `Bearer ${token}`,
    "cache-control": "no-cache"
    }
  };
  var body = '';
  var req = https.request(options, res => {
      res.on('data', d => {
          body += d;
      })
      res.on('error', e => {
          reject(e);
      })
      res.on('end', ()=>{
          resolve(body);
      })
  })
  req.on('error', e => {
        reject(e);
  })
  req.end();
  })
}

router.post('/', (req, res) => {

 var token = req.body.token;

 authenticateUser(token)
 .then(userInfo => {
   userController(userInfo)
   .then(userId => {
     res.status(200).json(userId);
   })
   .catch(error => {
     res.status(500).send(error);
   })
 })
 .catch(error => {
   res.status(403).send(error);
 })
})

module.exports = router;