const express = require('express');
const router = express.Router();
const gc = require('../../database/controllers/group_controllers');

router.post('/addGroup', (req, res) => {
  console.log('inside create group with', req.body.groupInfo, req.body.newRecipients, req.body.savedRecipients)
  gc.CreateNewGroup(req.body.groupInfo, req.body.newRecipients, req.body.savedRecipients)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/newRecipient', (req, res) => {
  gc.NewRecipient(req.body.userId, req.body.recipients)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/linkRecipient', (req, res) => {
  gc.AddRecipientToGroup(req.body.groupId, req.body.recipients)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.get('/allGroups/:userId', (req, res) => {
  gc.GetUserGroups(req.params.userId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.get('/availableRecipients/:userId/:groupId/:mediumType', (req, res) => {
  console.log('in availableRecipients route with', req.params.userId, req.params.groupId, req.params.mediumType)
  gc.GetAvailableRecipients(req.params.userId, req.params.groupId, req.params.mediumType)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/groupName', (req, res) => {
  gc.UpdateGroupName(req.body.groupId, req.body.groupName)
  .then(result => {
    console.log(result)
    res.status(200).json('result');
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/recipientInfo', (req, res) => {
  gc.UpdateRecipientInfo(req.body.recipientId, req.body.recipientInfo)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/recipient/:recipientId', (req, res) => {
  gc.DeleteRecipient(req.params.recipientId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/groupRecipient/:groupId/:recipientId', (req, res) => {
  gc.RemoveRecipient(req.params.groupId, req.params.recipientId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/deleteGroup/:groupId', (req, res) => {
  gc.DeleteGroup(req.parms.groupId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

module.exports = router;