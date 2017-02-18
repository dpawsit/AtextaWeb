var models = require('./models/db_models');
var db = require('./config');

models.User.create({
  email : 'rnesh90@yahoo.com',
  name : 'Ricky'
}).then(res => {
models.User.create({
  email : 'osaki.daniel@gmail.com',
  name : 'Danile'
})
}).then(res => {





models.Message.create({
  text : 'Call me right away',
  count : 0
}).then(createdMessage => {
  models.Group.create({
    name : 'My friends',
    mediumType : 'T',
    userId : 2
  }).then(createdGroup => {
    //console.log('!!!! created group !!!!', createdGroup.dataValues.id)
    models.Recipient.create({
      name : 'John',
      contactInfo : '7144498847',
      mediumType : 'T',
      userId : 2
    }).then(createdRecipient => {
       // console.log('!!!! created rec !!!!', createdRecipient.dataValues.id)
      models.GroupRecipients.create({
        groupId : createdGroup.dataValues.id,
        recipientId : createdRecipient.dataValues.id
      }).then(createdGR => {
        models.Command.create({
          name : 'Friends call',
          userId : 2,
          groupId : createdGroup.dataValues.id,
          messageId : createdMessage.dataValues.id,
          verified : false,
          status : 1
        })
      })
    })
  })
})
.catch(error => {
  console.log(error);
})

})