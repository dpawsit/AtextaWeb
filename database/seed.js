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
      for (var j = 0; j < 10; j++) {
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
      triggers.push({name : chance.sentence(), count : 0})
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

var createSecretCommand = (inputUserId, inputUserGroups, inputMessageId, inputResponseId) => {
  return new Promise ((resolve, reject) => {
    var secretCommands = [];
    var gropus = inputUserGroups;
       for (var j = 0; j < 5; j++) {
         var num = Math.floor(Math.random() * (groups.length));
         var randomGroup = groups.slice(num, 1)
         secretCommands.push({triggerId : randomTrigger,
          userId : inputUserId,
          groupId : randomGroup,
          secretMessageId : inputMessageId,
          responseId : inputResponseId,
          verified : false,
          status : 1})
       }
     resolve(secretCommands);
  })
}

var createSecretResponse = (inputCommandId) => {
  return new Promise ((resolve, reject) => {
    var secretResponses = [];

  })
}


createUsers().then(createdUsers => {
  Promise.map(createdUsers, createdUser => {
    return models.User.create({
      email : createdUser.email,
      name : createdUser.name
    })
  }).then(seededUsers => {
    var formattedSeededUsers = JSON.parse(JSON.stringify(seededUsers));
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
      var formattedGrAndRec = JSON.parse(JSON.stringify(seededGroupsAndRecipients))  
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
                var formattedSeededMessage = JSON.parse(JSON.stringify(seededMessage))
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
        })
      ])
    })
  })
}).catch(error => {
  console.log('error ', error)
})