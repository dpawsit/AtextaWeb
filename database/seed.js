"use strict"
var models = require('./models/db_models');
var db = require('./config');
var chance = require('chance').Chance(Math.random);
var Promise = require('bluebird');

var createUsers = () => {
  return new Promise ((resolve, reject) => {
    var users = [];
    for (var i = 0; i < 25; i++) {
      users.push({name : chance.name({nationality : 'en'}), email : chance.email()})
    }
    resolve(users);
  })
} 

var createRecipients = (inputUserId) => {
    var recipients = [];
      for (var j = 0; j < 10 ; j++) {
        recipients.push({name : chance.name({nationality : 'en'}), 
        contactInfo : chance.phone({formatted : false}), 
        mediumType : 'T', 
        userId : inputUserId})
      }
    return recipients
}

var createGroups = (inputUserId) => {
  return new Promise ((resolve, reject) => {
    var groups = [];
      for( var j = 0; j < 10; j++) {
        groups.push({userId : inputUserId, 
          name : chance.word(), 
          mediumType : 'T', recipients : createRecipients(inputUserId)})
      }
    resolve(groups);
  })
}

var createMessages = () => {
  return new Promise ((resolve, reject) => {
    var messages = [];
      for (var j = 0; j < 10; j++) {
        messages.push({text : chance.sentence()})
      }
    resolve(messages);
  })
}

var createTriggers = () => {
  return new Promise ((resolve, reject) => {
    var triggers = [];
    for (var i = 0; i < 10; i++) {
      triggers.push({name : chance.sentence()})
    }
    resolve(triggers);
  })
}

var createCommand = (inputUserGroups) => {
  return new Promise ((resolve, reject) => {
    var groups = inputUserGroups;
        var num = Math.floor(Math.random() * (groups.length));
        var randomGroup = groups[num]
        var getsGroup = (Math.floor((Math.random() * 2) + 1) === 1 ? randomGroup : null)
        var command = {name : chance.sentence({words : 3}), groupId : getsGroup}
    resolve(command);
  })
}

var createSecretCommand = (inputUserGroups, inputTriggers) => {
  return new Promise ((resolve, reject) => {
    var secretCommands = [];
    for(var i = 0; i < inputUserGroups.length; i++) {
      var groups = inputUserGroups[i].groups;
      var triggers = [...inputTriggers];
       for (var j = 0; j < 5; j++) {
         var num = Math.floor(Math.random() * (groups.length));
         var randomGroup = groups.splice(num, 1)
         var randomTrigger = triggers.splice(num, 1);
         secretCommands.push({triggerId : randomTrigger[0].id,
          userId : inputUserGroups[i].userId,
          groupId : randomGroup[0]})
       }
    }
     resolve(secretCommands);
  })
}

var formatResult = (sequelizeInput) => {
  return JSON.parse(JSON.stringify(sequelizeInput))
}

createUsers().then(createdUsers => {
  Promise.map(createdUsers, createdUser => {
    return models.User.create({
      email : createdUser.email,
      name : createdUser.name
    })
  }).then(seededUsers => {
    var formattedSeededUsers = formatResult(seededUsers);
    Promise.map(formattedSeededUsers, seededUser => {
       return createGroups(seededUser.id).then(createdUserGroups => {
         return Promise.map(createdUserGroups, userGroups => {
          return Promise.all([
            models.Group.create({
              name : userGroups.name,
              userId : userGroups.userId,
              mediumType : userGroups.mediumType
            }),
             Promise.map(userGroups.recipients, createdRecipient => {
              return models.Recipient.create({
                name : createdRecipient.name,
                contactInfo : createdRecipient.contactInfo,
                mediumType : createdRecipient.mediumType,
                userId : createdRecipient.userId
              })
            })
          ])
         })
       })
    }).then(seededGroupsAndRecipients => {
      var formattedGrAndRec = formatResult(seededGroupsAndRecipients)
      var organizedGrAndRc = [].concat.apply([], formattedGrAndRec.map(user => {
        return [].concat.apply([], user.map(userGroup => {
          return userGroup[1].map(recpient => {
            return {groupId : userGroup[0].id, recipientId : recpient.id}
          })
        }))
      }))

      var organizedUserGroups = formattedGrAndRec.map(user => {
        return {userId : user[0][0].userId, groups : user.map(group => {
          return group[0].id
        })}
      })

     Promise.all([
        Promise.map(organizedGrAndRc, GroupRecJoin => {
          return models.GroupRecipients.create({
            groupId : GroupRecJoin.groupId,
            recipientId:  GroupRecJoin.recipientId
          })
        }),
        Promise.map(organizedUserGroups, userGroups => {
          return createMessages().then(createdMessages => {
            return Promise.map(createdMessages, message => {
              return models.Message.create({
                text : message.text,
                count : 0
              }).then(seededMessage => {
                var formattedSeededMessage = formatResult(seededMessage);
                return createCommand(userGroups.groups).then(createdCommands => {
                  return models.Command.create({
                    name : createdCommands.name,
                    userId : userGroups.userId,
                    groupId : createdCommands.groupId,
                    messageId : formattedSeededMessage.id,
                    verified : false,
                    status : 1
                  })
                })
              })
            })
          })
        }),
        createTriggers().then(createdTriggers => {
          return Promise.map(createdTriggers, trigger => {
            return models.SecretTriggers.create({
              name : trigger.name,
              count : 0
            })
          }).then(seededTriggers => {
            var formattedTriggers = formatResult(seededTriggers);
            return createSecretCommand(organizedUserGroups, formattedTriggers).then(createdSecretCommands => {
              return Promise.map(createdSecretCommands, createdSecretCommand => {
                return models.SecretResponse.create({
                  speech : chance.sentence({words : 5}),
                  count : 0
                }).then(seededResponse => {
                  var formattedResponse = formatResult(seededResponse);
                  return models.SecretMessage.create({
                    text : chance.sentence({words : 6}),
                    count : 0
                  }).then(seededSecretMessage => {
                      var formattedSecretMessage = formatResult(seededSecretMessage);  
                      return models.SecretCommand.create({
                        triggerId : createdSecretCommand.triggerId,
                        userId : createdSecretCommand.userId,
                        groupId : createdSecretCommand.groupId,
                        secretMessageId : formattedSecretMessage.id,
                        responseId : formattedResponse.id,
                        verified : false,
                        status : 1
                    })           
                  })
                })
              })
            })
          })
        })
      ])
    })
  })
}).catch(error => {
  console.log('error ', error)
})