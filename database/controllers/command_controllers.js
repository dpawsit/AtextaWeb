var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var Command = Models.Command;
var Message = Models.Message;

module.exports.GetUserCommands = (inputUserId) => {
  console.log('in get user command controller with', inputUserId)
  return new Promise ((resolve, reject) => {
    db.query('select C.name as commandName, C.groupId, C.verified, M.text, M.additionalContent, G.mediumType, G.name as groupName from Commands C join Messages M on C.messageId = M.id left outer join Groups G on C.groupId = G.id where C.userId = ? and C.status = 1', 
    {replacements : [inputUserId], type : sequelize.QueryTypes.SELECT})
    .then(Commands => {
      resolve(Commands)
    })
    .catch(error => {
      console.log('the error is', error)
      reject(error)
    })
  })
}

module.exports.UpdateCommandGroup = (inputCommandId, NewGroupId) => {
  return new Promise ((resolve, reject) => {
    db.query('update Commands set groupId = ? where id = ?', 
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
    db.query('update Commands set name = ? where id = ?', 
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
  console.log('got to create command controller with', inputCommand)
  return new Promise ((resolve, reject) => {
    Message.create({
      text : inputCommand.text,
      additionalContent : inputCommand.additionalContent,
      count: 0
    }).then(newMessage => {
      Command.create({
        name : inputCommand.name,
        userId : inputCommand.userId,
        groupId : inputCommand.groupId,
        messageId : newMessage.dataValues.id,
        verified: false,
        status: 1
      }).then(newCommand => {
        console.log('new command created it is', newCommand)
        db.query('update Messages set commandId = ? where id = ?', 
        {replacements : [newCommand.dataValues.id, newMessage.dataValues.id], type : sequelize.QueryTypes.UPDATE})
        .then(result => {
          resolve(newCommand);
        })
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
      additionalContent : newMessageInfo.additionalContent,
      count : 0
    }).then(newMessage => {
      db.query('update Commands set messageId = ? where id = ?', 
      {replacements : [newMessage.dataValues.id, inputCommandId], type : sequelize.QueryTypes.UPDATE})
      .then(result => {
        resolve(result);
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.DeleteCommand = (inputCommandId) => {
  return new Promise ((resolve, reject) => {
    db.query('update Commands set status = 0 where id = ?', 
    {replacements : [inputCommandId], type: sequelize.QueryTypes.UPDATE})
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error);
    })
  })
}