var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var Command = Models.Command;
var Message = Models.Message;

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

module.exports.DeleteCommand = (inputCommandId) => {
  return new Promise ((resolve, reject) => {
    db.query('update Command set status = 0 where id = ?', 
    {replacements : [inputCommandId], type: sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error);
    })
  })
}