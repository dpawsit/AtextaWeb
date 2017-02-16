var db = require('../config.js');
var Sequelize = require('sequelize');

var User = db.define('User', {
  email : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : true
  },
  name : {
    type : Sequelize.STRING,
    allowNull : true,
    unique : false
  },
  authString : {
    type : Sequelize.STRING,
    allowNull : true,
    unique : false
  }
})

var Group = db.define('Group', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  userId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  },
  mediumType : {
    type : Sequelize.CHAR,
    allowNull : false,
    unique : false
  }
})

var GroupRecipients = db.define('GroupRecipients', {
  groupId : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  recipientId : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  }
})

var Recipient = db.define('Recipient', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  contactInfo : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  mediumType : {
    type : Sequelize.CHAR,
    allowNull : false,
    unique : false
  }
})

var Command = db.define('Command', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  userId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  },
  groupId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false    
  },
  messageId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false   
  },
 verified : {
   type : Sequelize.BOOLEAN,
   allowNull : false,
   defaulValue : false
 },
  status : {
    type : Sequelize.INTEGER,
    defaulValue : 1,
    allowNull : false,
    unique : false
  }
})

var SecretCommand = db.define('SecretCommand', {
 triggerId : {
   type : Sequelize.INTEGER,
   allowNull : false,
   unique : false
 },
 userId : {
   type : Sequelize.INTEGER,
   allowNull : false,
   unique : false
 }, 
 groupId : {
   type : Sequelize.INTEGER,
   allowNull : false,
   unique : false
 },
 secretMessageId : {
   type : Sequelize.INTEGER,
   allowNull : false,
   unique : false
 },
 responseId : {
   type : Sequelize.INTEGER,
   allowNull : false,
   unique : false
 },
 verified : {
   type : Sequelize.BOOLEAN,
   allowNull : false,
   defaulValue : false
 },
  status : {
  type : Sequelize.INTEGER,
  defaulValue : 1,
  allowNull : false,
  unique : false
  }
})

var SecretResponse = db.define('SecretResponse', {
  speech : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
    count : {
    type: Sequelize.INTEGER,
    defaulValue : 0,
    unique : false,
    allowNull : false
  },
  secretCommandId : {
    type : Sequelize.INTEGER,
    allowNull : true,
    unique : false
  }
})

var SecretTriggers = db.define('SecretTriggers', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : true
  },
  count : {
    type: Sequelize.INTEGER,
    defaulValue : 0,
    unique : false,
    allowNull : false
  }
})

var Message = db.define('Message', {
  text : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  additionalContent : {
    type : Sequelize.STRING,
    allowNull : true,
    unique : false
  },
  count : {
    type: Sequelize.INTEGER,
    defaulValue : 0,
    unique : false,
    allowNull : false
  },
  commandId : {
    type : Sequelize.INTEGER,
    unique : false,
    allowNull : true
  }
})

var SecretMessage = db.define('SecretMessage', {
  text : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  additionalContent : {
    type : Sequelize.STRING,
    allowNull : true,
    unique : false
  },
  count : {
    type: Sequelize.INTEGER,
    defaulValue : 0,
    unique : false,
    allowNull : false
  },
  secretCommanId : {
    type : Sequelize.INTEGER,
    unique : false,
    allowNull : true
  }
})

var TriggeredCommands = db.define('TriggeredCommands', {
  commandId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  },
  userId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  }
})

var TriggeredSecrets = db.define('TriggeredSecrets', {
  SecretCommandId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  },
    userId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  }
})

module.exports = {
  User : User,
  Group : Group, 
  GroupRecipients : GroupRecipients,
  Recipient : Recipient,
  Command : Command,
  Message : Message,
  SecretCommand : SecretCommand,
  SecretTriggers : SecretTriggers,
  SecretResponse : SecretResponse,
  SecretMessage : SecretMessage,
  TriggeredCommands : TriggeredCommands,
  TriggeredSecrets : TriggeredSecrets
}