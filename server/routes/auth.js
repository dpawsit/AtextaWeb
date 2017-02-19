const express = require('express');
const router = express.Router();
const userController = require('../../database/controllers/user_controller');
const Promise = require('bluebird');
const https = require('https');
const jwt = require('jsonwebtoken')

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

router.post('/login', (req, res) => {
 authenticateUser(req.body.token)
 .then(profile => {
  userController.UserLogin(JSON.parse(profile))
  .then(userId => {
    res.status(200).json(userId);
  })
})
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({logout : true});
})

module.exports = router;