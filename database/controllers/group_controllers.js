var db = require('../config')
var Promise = require('bluebird')
var sequelize = require('sequelize')
var Models = require('../models/db_models')
var Group = Models.Group
var Recipient = Models.Recipient
var GroupRecipients = Models.GroupRecipients

module.exports.CreateNewGroup = (inputGroupInfo, inputRecipients, savedRecipients) => {
  return new Promise((resolve, reject) => {
   console.log('about to create group with', inputGroupInfo.name, inputGroupInfo.userId, inputGroupInfo.mediumType)
   Group.create({
     name: inputGroupInfo.name,
     userId: inputGroupInfo.userId,
     mediumType: inputGroupInfo.mediumType
   })
   .then(createdGroup => {
     var newRecipients = []
     console.log('about to map with', inputRecipients)
     Promise.map(inputRecipients, (recipient) => {
      console.log('about to create new recipient with', recipient.name, recipient.contactInfo)
      return Recipient.create({
        name: recipient.name,
        contactInfo: recipient.contactInfo,
        mediumType: inputGroupInfo.mediumType,
        userId: inputGroupInfo.userId
      }).then(createdRec => {
        console.log('about to create grouprecipient with', createdRec.dataValues.id, createdGroup.dataValues.id)
        newRecipients.push(createdRec.dataValues)
        return GroupRecipients.create({
          groupId: createdGroup.dataValues.id,
          recipientId: createdRec.dataValues.id
        })
      })
    })
    .then(createdRecipients => {
      Promise.map(savedRecipients, recipient => {
        console.log('about to create second wave of group recipients with', createdGroup.dataValues.id, recipient)
        return GroupRecipients.create({
          groupId: createdGroup.dataValues.id,
          recipientId: recipient.id
        })
      })
      .then(joinedRecipients => {
        console.log('successfully created group', joinedRecipients.dataValues, newRecipients)
        resolve({group: createdGroup, recipients: newRecipients})
      })
    })
   })
   .catch(error => {
     console.log('error adding group tp db', error)
     reject(error)
   })
 })
}

module.exports.NewRecipient = (inputUserId, newRecipients) => {
  return new Promise((resolve, reject) => {
    console.log('jesse 1', inputUserId, newRecipients)
    Promise.map(newRecipients, recipient => {
      return Recipient.create({
        name: recipient.name,
        contactInfo: recipient.contactInfo,
        mediumType: recipient.mediumType,
        userId: inputUserId
      })
    })
    .then(createdRecipient => {
      console.log('jesse 2 = ', createdRecipient)
      resolve(createdRecipient.dataValues)
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.AddRecipientToGroup = (inputGroupId, inputRecipIds) => {
  return new Promise((resolve, reject) => {
    Promise.map(inputRecipIds, id => {
      GroupRecipients.create({
        groupId: inputGroupId,
        recipientId: id
      })
    })
    .then(joinedRec => {
      resolve(joinedRec.dataValues)
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.GetUserGroups = (inputUserId) => {
  return new Promise((resolve, reject) => {
    var groups = []
    db.query('select id, name, mediumType from Groups where userId = ?',
    {replacements: [inputUserId], type: sequelize.QueryTypes.SELECT})
    .then(userGroups => {
      Promise.map(userGroups, (group, index) => {
        return db.query('select R.* from Recipients R join GroupRecipients GR on R.id = GR.recipientId where GR.groupId = ?',
          {replacements: [group.id], type: sequelize.QueryTypes.SELECT})
          .then(groupRecipients => {
            var thisGroup = {
              'name': group.name,
              'mediumType': group.mediumType,
              'groupId': group.id,
              'recipients': groupRecipients
            }

            groups.push(thisGroup)
          })
      })
      .then(result => {
        resolve(groups)
      })
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.UpdateGroupName = (inputGroupId, newGroupName) => {
  return new Promise((resolve, reject) => {
    db.query('update Groups set name = ? where id = ?',
    {replacements: [newGroupName, inputGroupId], type: sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.UpdateRecipientInfo = (inputRecipId, inputInfo) => {
  return new Promise((resolve, reject) => {
    var queryString = ''
    var rep = []

    if (inputInfo.name !== null && inputInfo.contactInfo !== null) {
      queryString = 'set name = ?, contactInfo = ?'
      rep = [inputInfo.name, inputInfo.contactInfo, inputRecipId]
    } else if (inputInfo.name !== null) {
      queryString = 'set name = ?'
      rep = [inputInfo.name, inputRecipId]
    } else {
      queryString = 'set contactInfo = ?'
      rep = [inputInfo.contactInfo, inputRecipId]
    }

    db.query('update Recipients ' + queryString + 'where id = ?',
    {replacements: rep, type: sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.RemoveRecipient = (inputGroupId, recId) => {
  return new Promise((resolve, reject) => {
   GroupRecipients.destroy({
    where: {
      recipientId: recId,
      groupId: inputGroupId
    }
  })
  .then(result => {
    resolve(result)
  })
  .catch(error => {
    reject(error)
  })
 })
}

module.exports.GetAvailableRecipients = (userId, groupId, type) => {
  console.log(userId, groupId, type)
  return new Promise((resolve, reject) => {
    let queryString = (groupId === 0 ? '' : 'and mediumType = ? and id not in (select recipientId from GroupRecipients where groupId = ?)')
    let rep = (groupId === 0 ? [userId] : [userId, type, groupId])
    db.query(`select name, contactInfo, id from Recipients where userId = ? ${queryString}`,
    {replacements: rep, type: sequelize.QueryTypes.SELECT})
    .then(availableUsers => {
      console.log(availableUsers)
      resolve(availableUsers)
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.DeleteRecipient = (recId) => {
  return new Promise((resolve, reject) => {
    Promise.All([
      Recipient.destroy({
        where: {
          id: recId
        }
      }),
      GroupRecipients.destroy({
        where: {
          recipientId: recId
        }
      })
    ])
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports.DeleteGroup = (inputGroupId) => {
  return new Promise((resolve, reject) => {
    Promise.All([
      db.query('delete from Recipients where id in (select recipientId from GroupRecipients where groupId = ?)',
      {replacements: [inputGroupId], type: sequelize.QueryTypes.DELETE}),
      GroupRecipients.destroy({
        where: {
          groupId: inputGroupId
        }
      }),
      Group.destroy({
        where: {
          id: inputGroupId
        }
      })
    ])
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error)
    })
  })
}
