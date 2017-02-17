const express = require('express');
const router = express.Router();
const sc = require('../../database/controllers/secretCommand_controllers')

router.get('/SecretCommands/:userId', (req, res) => {
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

router.post('/SecretCommand', (req, res) => {
  sc.CreateNewSecretCommand(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/SecretResponse', (req, res) => {
  sc.UpdateSecretResponse(req.body.commandId, req.body.newResponse)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/SecretGroup/:commandId/:groupId', (req, res) => {
  sc.UpdateSecretCommandGroup(req.params.commandId, req.params.groupId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/SecretTrigger/:commandId/:triggerId', (req, res) => {
  sc.UpdateSecretTrigger(req.params.commandId, req.params.triggerId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/secretCommand/:commandId', (req, res) => {
  sc.DeleteSecretCommand(req.params.commandId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


module.exports = router;