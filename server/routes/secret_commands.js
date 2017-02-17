const express = require('express');
const router = express.Router();
const sc = require('../../database/controllers/secretCommand_controllers')

router.get('/userCommands/:userId', (req, res) => {
  sc.GetUserSecretCommands(req.params.userId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.get('/availableSecretTriggers/:userId', (req, res) => {
  sc.GetAvailableSecretTriggers(req.params.userId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/newCommand', (req, res) => {
  sc.CreateNewSecretCommand(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/newMessage', (req, res) => {
  sc.NewSecretMessage(req.body.commandId, req.body.newMessage)
  .then()
  .catch()
})

router.put('/secretResponse', (req, res) => {
  sc.UpdateSecretResponse(req.body.commandId, req.body.newResponse)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/updateGroup', (req, res) => {
  sc.UpdateSecretCommandGroup(req.body.commandId, req.body.groupId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/updateTrigger', (req, res) => {
  sc.UpdateSecretTrigger(req.body.commandId, req.body.newTriggerId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/deleteCommand/:commandId', (req, res) => {
  sc.DeleteSecretCommand(req.params.commandId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


module.exports = router;