const express = require('express');
const router = express.Router();
const userController = require('../../database/controllers/user_controller');
const Promise = require('bluebird');
const https = require('https');
const jwt = require('jsonwebtoken')
const keys = require('../../keys')

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
//  console.log('got into login post with token', token)
//  authenticateUser(token)
//  .then(userInfo => {
//  console.log('we are in login post with profile:', req.body.profile, 'and secret:', keys.tokenSecret)
  // let verfiy = jwt.verify(token, keys.tokenSecret, function(err, decoded) {
  //   if(err) {
  //     console.log('error verifying token', err)
  //   } else {
  //     console.log('decoded token:', decoded)
  //   }
  // })
// console.log(JSON.stringify(req))
  let profile = req.body.profile
  userController.UserLogin(profile)
  .then(userId => {
    res.status(200).json(userId);
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