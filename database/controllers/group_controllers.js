var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var Group = Models.Group;
var Recipient = Models.Recipient;
var GroupRecipients = Models.GroupRecipients;

module.exports.CreateNewGroup = (inputGroupInfo, inputRecipients, savedRecipients) => {
 return new Promise ((resolve, reject) => {
   Group.create({
     name : inputGroupInfo.name,
     userId : inputGroupInfo.userId,
     mediumType : inputGroupInfo.mediumType
   })
   .then(createdGroup => {
    var newRecipients = [];
    Promise.map(inputRecipients, recipient => {
      return Recipient.create({
        name : recipient.name,
        contactInfo : recipient.contactInfo,
        mediumType : inputGroupInfo.mediumType,
        userId : inputGroupInfo.userId
      }).then(createdRec => {
        newRecipients.push(createdRec.dataValues)
        return GroupRecipients.create({
          groupId : createdGroup.dataValues.id,
          recipientId : createdRec.dataValues.id
        })
      })
    })
    .then(createdRecipients => {
      Promise.map(savedRecipients, recipient => {
        return GroupRecipients.create({
          groupId : createdGroup.dataValues.id,
          recipientId : recipient
        })
      })
      .then(joinedRecipients => {
        resolve({group : createdGroup, recipients : newRecipients});
      })
    })
   })
   .catch(error => {
     reject(error);
   })
 })
}

module.exports.NewRecipient = (inputUserId, newRecipients) => {
  return new Promise ((resolve, reject) => {
    Promise.map(newRecipients, recipient => {
      Recipient.create({
        name : recipient.name,
        contactInfo : recipient.contactInfo,
        mediumType : recipient.mediumType,
        userId : inputUserId
      })
    })
    .then(createdRecipient => {
      resolve(createdRecipient.dataValues);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.AddRecipientToGroup = (inputGroupId, inputRecipIds) => {
  return new Promise ((resolve, reject) => {
    Promise.map(inputRecipIds, id => {
      GroupRecipients.create({
        groupId : inputGroupId,
        recipientId : id
      })
    })
    .then(joinedRec => {
      resolve(joinedRec.dataValues);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.GetUserGroups = (inputUserId) => {
  return new Promise ((resolve, reject) => {
    var groups = {};
    db.query('select id, name, medium from Groups where userId = ?', 
    {replacements : [inputUserId], type : sequelize.QueryTypes.SELECT})
    .then(userGroups => {
      Promise.map(userGroups, (group, index) => {
        return  db.query('select R.* from Recipients R join GroupRecipients GR on R.id = GR.recipientId where GR.groupId = ?',
          {replacements : [group.id], type : sequelize.QueryTypes.SELECT})
          .then(groupRecipients => {
      
            var thisGroup = {
              'name' : group.name,
              'mediumType' : group.medium,
              'groupId' : group.id,
              'recipients' : groupRecipients
            };

            groups[index] = thisGroup;
          })
      })
      .then(result => {
        resolve(groups)
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.UpdateGroupName = (inputGroupId, newGroupName) => {
  return new Promise ((resolve, reject) => {
    db.query('update Groups set name = ? where id = ?', 
    {replacements : [newGroupName, inputGroupId], type : sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.UpdateRecipientInfo = (inputRecipId, inputInfo) => {
  return new Promise ((resolve, reject) => {

    var queryString = '';
    var rep = [];

    if (inputInfo.name !== null && inputInfo.contactInfo !== null) {
      queryString = 'set name = ?, contactInfo = ?';
      rep = [inputInfo.name, inputInfo.contactInfo, inputRecipId]
    } else if (inputInfo.name !== null) {
      queryString = 'set name = ?';
      rep = [inputInfo.name, inputRecipId]      
    } else {
      queryString = 'set contactInfo = ?';
      rep = [inputInfo.contactInfo, inputRecipId]       
    }

    db.query('update Recipients ' + queryString + 'where id = ?', 
    {replacements : rep, type : sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.RemoveRecipient = (inputGroupId, recId) => {
 return new Promise ((resolve, reject) => {
  GroupRecipients.destroy({
    where : {
      recipientId : recId,
      groupId : inputGroupId
    }
  })
  .then(result => {
    resolve(result);
  })
  .catch(error => {
    reject(error);
  })
 })
}

module.exports.GetAvailableRecipients = (userId, groupId, type) => {
  return new Promise ((resolve, reject) => {
    db.query('select name, contactInfo from Recipients where mediumType = ? and userId = ? and id not in (select recipientId from GroupRecipients where groupId = ?)',
    {replacements : [type, userId, groupId], type : sequelize.QueryTypes.SELECT})
    .then(availableUsers => {
      resolve(availableUsers);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.DeleteRecipient = (recId) => {
  return new Promise ((resolve, reject) => {
    Promise.All([
      Recipient.destroy({
        where : {
          id : recId
        }
      }),
      GroupRecipients.destroy({
        where : {
          recipientId : recId
        }
      })
    ])
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.DeleteGroup = (inputGroupId) => {
  return new Promise ((resolve, reject) => {
    Promise.All([
      db.query('delete from Recipients where id in (select recipientId from GroupRecipients where groupId = ?)', 
      {replacements : [inputGroupId], type : sequelize.QueryTypes.DELETE}),
      GroupRecipients.destroy({
        where : {
          groupId : inputGroupId
        }
      }),
      Group.destroy({
        where : {
          id : inputGroupId
        }
      })
    ])
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}