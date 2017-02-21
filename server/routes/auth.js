const express = require('express');
const router = express.Router();
const userController = require('../../database/controllers/user_controller');
const Promise = require('bluebird');
const https = require('https');
const jwt = require('jsonwebtoken');
const config = require('../../keys').secret

const authenticateUser = (token) => {
  return new Promise ((resolve, reject) => {
      let options = {
          "method": "GET",
          "hostname": "rakan.auth0.com",
          "port": null,
          "path": "/userinfo",
          "headers": {
              "authorization": `Bearer ${token}`,
              "cache-control": "no-cache"
          }
      };
  let body = '';
  let req = https.request(options, res => {
      res.on('data', d => {
          body += d;
      });
      res.on('error', e => {
          reject(e);
      });
      res.on('end', ()=>{
          resolve(body);
      })
  });
  req.on('error', e => {
        reject(e);
  });
  req.end();
  })
};

router.post('/login', (req, res) => {
 authenticateUser(req.body.token)
 .then(profile => {
  userController.UserLogin(JSON.parse(profile))
  .then(userId => {
    jwt.sign({userId}, config, {
      expiresIn : '1h'
    }, (error, token) => {
        if (error) {
            res.status(403).send(error);
        }
        console.log('signed token: ', token);
        res.status(200).json({userId, token});
    });
  })
})
  .catch(error => {
    res.status(500).send(error);
  })
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({logout : true});
});

module.exports = router;