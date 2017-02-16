var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var Command = Models.Command;
var Message = Models.Message;


//view all user commands 

// input : userId
// ouput :object with 2 arrays.  
//Array 1 will contain saved messages => command name, id, text from message, 
//messageId, verified status and medium/groupId(name) when they exist
//Array 2 will contain secret commands => trigger name, id, medium, groupId,
//speechResponse, responseId, text from message, messageId, verified status

module.exports.GetUserCommands = (inputUserId) => {
  return new Promise ((resolve, reject) => {
    db.query('select C.name, C.groupId, C.verified, M.text, M.additionalContent, G.mediumType, G.name from Command C join Message M on C.id = M.commandId left outer join Group G on C.groupId = G.id where C.userId = ? and C.status = 1', 
    {replacements : [inputUserId], type : sequelize.QueryTypes.SELECT})
    .then(Commands => {
      resolve(Commands)
    })
    .catch(error => {
      reject(error)
    })
  })
}


//Update Command group
//input : commandId, NewgroupId

module.exports.UpdateCommandGroup = (inputCommandId, NewGroupId) => {
  return new Promise ((resolve, reject) => {
    db.query('update Command set groupId = ? where id = ?', 
    {replacements : [NewGroupId, inputCommandId], type : sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}

//Update Command name 
//input : commandId, NewnewCommandName
//updating the name will set Command.verified to flase, will have to be retested

module.exports.UpdateCommandName = (inputCommandId, NewCommandName) => {
  return new Promise ((resolve, reject) => {
    db.query('update Command set name = ? where id = ?', 
    {replacements : [NewCommandName, inputCommandId]})
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}
//Create a Command 
//input : userId, messageText, messageAdl Info, groupId
//output : commandId

module.exports.CreateNewCommand = (inputCommand) => {
  return new Promise ((resolve, reject) => {
    Message.create({
      text : inputCommand.text,
      additionalContent : inputCommand.additionalContent
    }).then(newMessage => {
      Command.create({
        name : inputCommand.name,
        userId : inputCommand.userId,
        groupId : inputCommand.groupId,
        messageId : newMessage[0].id
      }).then(newCommand => {
        db.query('update Message set commandId = ? where id = ?', 
        {replacements : [newCommand[0].id, newMessage[0].id], type : sequelize.QueryTypes.UPDATE})
        .then(result => {
          resolve(newCommand);
        })
        .catch(error => {
          reject(error);
        })
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}

//Update MessageContent
//input : messageId, messageText, messageAdl Info

module.exports.UpdateCommandMessage = (inputCommandId, newMessageInfo) => {
  return new Promise ((resolve, reject) => {
    Message.create({
      text : newMessageInfo.text,
      additionalContent : newMessageInfo.additionalContent
    }).then(newMessage => {
      db.query('update Command set messageId = ? where id = ?', 
      {replacements : [newMessage[0].id, inputCommandId], type : sequelize.QueryTypes.UPDATE})
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}



