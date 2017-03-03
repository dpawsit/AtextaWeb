"use strict"
const express = require('express');
const router = express.Router();
const WebClient = require('@slack/client').WebClient;

router.get('/getChannels', (req, res) => {
  let allChannels = {
    channels: [],
    groups: [],
    users: []
  };
  let token = req.query.token
  var web = new WebClient(token);
  web.channels.list(function(err, channelInfo) {
    if (err) {
      console.log('Error:', err);
      res.status(500).send(error);
    } else {
      for(var i in channelInfo.channels) {
        allChannels['channels'].push(channelInfo.channels[i].name);
      }
      web.groups.list(function(err, groupInfo) {
        if (err) {
          res.status(500).send(err)
        } else {
          for(var i in groupInfo.groups) {
            allChannels['groups'].push(groupInfo.groups[i].name);
          }
          web.users.list(function(err, userInfo) {
            if (err) {
              res.status(500).send(err)
            } else {
              for(var i in userInfo.members) {
                allChannels['users'].push({
                  id: userInfo.members[i].id,
                  name: userInfo.members[i].name
                });
              }
              res.status(200).send(allChannels);
            }
          })
        }
      })
    }
  })
})

module.exports = router;

// res.status(200).send(allChannels);