const express = require('express');
const router = express.Router();
const gc = require('../../database/controllers/group_controllers');

router.post('/Group', (req, res) => {
  gc.CreateNewGroup(req.body.groupInfo, req.body.recipients)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.get('/Groups/:userId', (req, res) => {
  gc.GetUserGroups(req.params.userId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.put('/groupName/:groupId/:groupName', (req, res) => {
  gc.UpdateGroupName(req.params.groupId, req.params.groupName)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.post('/recipientInfo', (req, res) => {
  gc.UpdateRecipientInfo(req.body.recipientId, req.body.recipientInfo)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/Recipient/:recipientId', (req, res) => {
  gc.DeleteRecipient(req.params.recipientId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

router.delete('/Group/:groupId', (req, res) => {
  gc.DeleteGroup(req.parms.groupId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

module.exports = router;