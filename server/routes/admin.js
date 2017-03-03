"use strict"
const express = require('express');
const router = express.Router();
const ac = require('../../database/controllers/admin_controllers');
const util = require('../server_util');

router.post('/adminLogin', (req, res) => {
  ac.adminLogin(req.body.loginInfo)
  .then(result => {
    if (result.admin) {
      util.signToken(result.id)
      .then(signedToken => {
        res.status(200).json({admin: result.admin, id: result.id, token : signedToken});
      })
      .catch(error => {
        res.status(500).send(error);
      })
    } else {
      res.status(200).json(result);
    }
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/createAdmin', (req, res) => {
  ac.createAdmin(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.get('/getAdminQueries', (req, res) => {
  ac.getAdminQueries()
  .then(queries => {
    res.status(200).json(queries);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.get('/runAdminQuery', (req, res) => {
  ac.runAdminQuery(req.query.queryString)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    try {
      res.status(500).send({error : JSON.stringify(error.message)});
    } catch (e) {
      res.status(500).send({error : error})
    }
  })
})

router.post('/createNewAdminQuery', (req, res) => {
  ac.createNewAdminQuery(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    try {
      res.status(500).send({error: error.errors[0].message});
    } catch (e) {
      res.status(500).send({error : error})
    }
  })
})

router.put('/updateAdminQuery', (req, res) => {
  ac.updateAdminQuery(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    try {
      res.status(500).send({error: error.errors[0].message});
    } catch (e) {
      res.status(500).send({error : error})
    }
  })
})

router.delete('/deleteAdminQuery', (req, res) => {
  ac.deleteAdminQuery(req.query.deleteInfo)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/updatePassword', (req, res) => {
  ac.updatePassword(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/createNewAdmin', (req, res) => {
  ac.createNewAdmin(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    try {
      res.status(500).send({error: error.errors[0].message})
    } catch (e) {
      res.status(500).send({error: error});
    }
  })
})

module.exports = router;