const express = require('express');
const router = express.Router();
const cc = require('../../database/controllers/command_controllers');

router.get('/userGroups/:userId', (req, res) => {
  cc.GetUserCommands(req.params.userId)
  .then(result => {
    res.status(200).json(commands);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/updateGroup/:commandId/:groupId', (req, res) => {
  cc.UpdateCommandGroup(req.params.commandId, req.params.groupId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/updateName/:commandId/:name', (req, res) => {
  cc.UpdateCommandName(req.params.commandId, req.params.name)
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

router.delete('/delete/:commandId', (req, res) => {
  cc.DeleteCommand(req.params.commandId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

module.exports = router;