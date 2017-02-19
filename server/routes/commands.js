const express = require('express');
const router = express.Router();
const cc = require('../../database/controllers/command_controllers');

router.get('/userCommands/:userId', (req, res) => {
  console.log('inside userCommands with', req.params.userId)
  cc.GetUserCommands(req.params.userId)
  .then(result => {
    res.status(200).json(commands);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/updateGroup', (req, res) => {
  cc.UpdateCommandGroup(req.body.commandId, req.body.groupId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/updateName', (req, res) => {
  cc.UpdateCommandName(req.body.commandId, req.body.updateName)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/newCommand', (req, res) => {
  cc.CreateNewCommand(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/newMessage/', (req, res) => {
  cc.UpdateCommandMessage(req.body.commandId, req.body.newMessage)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/deleteCommand/:commandId', (req, res) => {
  cc.DeleteCommand(req.params.commandId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

module.exports = router;