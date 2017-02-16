var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var SecretCommand = Models.SecretCommand;


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

//Create a Secret Trigger
//input : userId, triggerId, messageText, messageAdl Info, groupId, responseSpeech, responseId
//outPut: SecretCommadId, responseId

module.exports.CreateNewSecretCommand = () => {
   return new Promise ((resolve, reject) => {

  }) 
}

//UpdateSecretResponse
//input: responseId, responseSpeech
//on updating secret response, the secret command will have to be retested so SecretComman.Veried = false

module.exports.UpdateSecretResponse = () => {
    return new Promise ((resolve, reject) => {

  })
}
//Update Secret Trigger group 
//input : commandId, groupId

module.exports.UpdateSecretCommandGroup = () => {

}
//update trigger phrase
//input : SecretCommadId, triggerId

module.exports.UpdateSecretTrigger = () => {

}
