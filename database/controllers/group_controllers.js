var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var Group = Models.Group;
var Recipient = Models.Recipient;
var GroupRecipients = Models.GroupRecipients;

//insert a new group
// input : userId, mediumId, GroupName
module.exports.CreateNewGroup = (inputGroupInfo, inputRecipients) => {
 return new Promise ((resolve, reject) => {
   Group.create({
     name : inputGroupInfo.name,
     userId : inputGroupInfo.userId,
     mediumType : inputGroupInfo.mediumType
   })
   .then(createdGroup => {
    Promise.map(inputRecipients, recipient => {
      return Recipient.create({
        name : recipient.name,
        contactInfo : recipient.contactInfo,
        mediumType : inputGroupInfo.mediumType
      }).then(createdRec => {
        return GroupRecipients.create({
          groupId : createdGroup[0].id,
          recipientId : createdRec[0].id
        })
      })
    })
    .then(createdRecipients => {
      resolve(createdGroup);
    })
   })
   .catch(error => {
     reject(error);
   })
 })
}

//view all user groups and their associated recipients
// input : userId
// output : groupId, groupName, medium Type

module.exports.GetUserGroups = (inputUserId) => {
  return new Promise ((resolve, reject) => {
    var groups = {};
    db.query('select id, name, medium from Group where userId = ?', 
    {replacements : [inputUserId], type : sequelize.QueryTypes.SELECT})
    .then(userGroups => {
      Promise.map(userGroups, (group, index) => {
        return  db.query('select R.* from Recipient R join GroupRecipients GR on R.id = GR.recipientId where GR.groupId = ?',
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

//update existing group (only name is editable )
// input : groupId + newName

module.exports.UpdateGroupName = (inputGroupId, newGroupName) => {
  return new Promise ((resolve, reject) => {
    db.query('update Group set name = ? where id = ?', 
    {replacements : [newGroupName, inputGroupId], type : sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}

//update specific recipient information
// input : recId, name, contactInfo --- name and contactInfo should be in 1 object, pass undefined for the value not getting updated

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

    db.query('update Recipient ' + queryString + 'where id = ?', 
    {replacements : rep, type : sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}
//delete recipient
// input : recId
module.exports.DeleteRecipient = (recId) => {
  return new Promise ((resolve, reject) => {
    Promise.All([
      Recipient.destroy({
        where : {
          id : recId
        }
      }),
      GroupRecipients.delete({
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
      db.query('delete from Recipient where id in (select recipientId from GroupRecipients where groupId = ?)', 
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