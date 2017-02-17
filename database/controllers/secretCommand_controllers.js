var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var SecretCommand = Models.SecretCommand;
var SecretMessage = Models.SecretMessage;
var SecretResponse = Models.SecretResponse;


module.exports.GetUserSecretCommands = (inputUserId) => {
  return new Promise ((resolve, reject) => {
    db.query('select S.triggerId, S.groupId, S.secretMessageId, S.responseId, S.verified, ST.name, SR.speech, SM.text, SM.additionalContent from SecretCommand S join SecretResponse SR on S.responseId = SR.id join SecretTriggers ST on S.triggerId = ST.id join SecretMessage SM on S.secretMessageId = SM.id where S.userId = ? and S.status = 1', 
    {replacements : [inputUserId], type : sequelize.QueryTypes.SELECT})
    .then(SecretCommands => {
      resolve(SecretCommands)
    })
    .catch(error => {
      reject(error);
    })
  })
}
//View Secret Allowable Secret Triggers, will only show those available to each User
//output : triggerNames, triggerIds
module.exports.GetAvailableSecretTriggers = (inputUserId) => {
  return new Promise ((resolve, reject) => {
    db.query('select * from SecretTriggers ST where ST.id not in (select SC.triggerId from SecretCommand SC where SC.userId = ? and SC.status = 1)',
    {replacements : [inputUserId], type : sequelize.QueryTypes.SELECT})
    .then(availableTriggers => {
      resolve(availableTriggers);
    })
    .catch(error => {
      reject(error);
    })
  })
}

//Create a Secret Command
//input : userId, triggerId, messageText, messageAdl Info, groupId, responseSpeech
//outPut: SecretCommadId, responseId

module.exports.CreateNewSecretCommand = (inputInfo) => {
  return new Promise ((resolve, reject) => {
    SecretMessage.create({
      text : inputInfo.text,
      additionalContent : inputInfo.additionalContent
     })
     .then(createdMessage => {
        SecretResponse.create({
          speech : inputInfo.responseSpeech
        })
        .then(responseCreated => {
          SecretCommand.create({
            triggerId : inputInfo.triggerId,
            userId : inputInfo.userId,
            groupId : inputInfo.groupId,
            secretMessageId : createdMessage[0].id,
            responseId : responseCreated[0].id
          })
          .then(createdSecretCommand => {
            db.query('update SecretResponse set secretCommandId = ? where id = ?', 
            {replacements : [createdSecretCommand[0].id, responseCreated[0].id], type: sequelize.QueryTypes.UPDATE})
            .then(result => {
              db.query('update SecretMessage set secretCommandId = ? where id = ? ',
              {replacements : [createdSecretCommand[0].id, createdMessage[0].id], type : sequelize.QueryTypes.UPDATE})
              .then(result => {
                resolve(createdSecretCommand);
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
            reject(error)
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

//UpdateSecretResponse
//input: responseId, responseSpeech
//on updating secret response, the secret command will have to be retested so SecretComman.Veried = false

module.exports.UpdateSecretResponse = (inputCommandId, newResponse) => {
  return new Promise ((resolve, reject) => {
    SecretResponse.create({
      speech : newResposne.speech,
      secretCommandId : inputCommandId
    })
    .then(createdResponse => {
      db.query('update SecretCommand set responseId = ? , verified = false where id = ?', 
      {replacements : [createdResponse[0].id, inputCommandId], type : sequelize.QueryTypes.UPDATE})
      .then(updatedSecretCommand => {
        resolve(updatedSecretCommand);
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
//Update Secret Trigger group 
//input : commandId, groupId

module.exports.UpdateSecretCommandGroup = (inputCommandId, inputGroupId) => {
  return new Promise ((resolve, reject) => {
    db.query('update SecretCommand set groupId = ? where id = ?', 
    {replacements: [inputGroupId, inputCommandId], type : sequelize.QueryTypes.UPDATE})
    .then(updatedSecretCommand => {
      resolve(updatedSecretCommand);
    })
    .catch(error => {
      reject(error);
    })
  })
}
//update trigger phrase
//input : secretCommandId, triggerId

module.exports.UpdateSecretTrigger = (inputCommandId, inputTriggerId) => {
  return new Promise ((resolve, reject) => {
    db.query('update SecretCommand set triggerId = ?, verified = false where id = ?',
    {replacements : [inputTriggerId, inputCommandId], type : sequelize.QueryTypes.UPDATE})
    .then(updatedSecretCommand => {
      resolve(updatedSecretCommand);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.DeleteSecretCommand = (inputCommandId) => {
 return new Promise ((resolve, reject) => {
   db.query('update SecretCommand set status = 0 where id = ?', 
   {replacements : [inputCommandId], type : sequelize.QueryTypes.UPDATE})
   .then(result => {
    resolve(result);
   })
   .catch(error => {
     reject(error);
   })
 })
}

module.exports.NewSecretMessage = () => {
  
}