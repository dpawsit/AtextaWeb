var db = require('../config.js');
var Sequelize = require('sequelize');

var Users = db.define('Users', {
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

var Groups = db.define('Groups', {
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
  mediumId : {
    type : Sequelize.INTEGER,
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
  recId : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  }
})

var TextRec = db.define('TextRec', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  phone : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false
  }
})

var EmailRec = db.define('EmailRec', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  }, 
  email : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  }
})

var SlackRec = db.define('SlackRec', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : false
  },
  slackInfo : {
    type : Sequelize.STRING,
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
  mediumId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : false    
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
    allowNull : false,
    unique : false
  }
})

var MediumList = db.define('MediumList', {
  mediumId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    unique : true
  },
  mediumName : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : true
  }
})

module.exports = {
  Users : Users,
  Groups : Groups, 
  GroupRecipients : GroupRecipients,
  TextRec : TextRec,
  EmailRec : EmailRec, 
  SlackRec : SlackRec,
  Command : Command,
  Message : Message,
  MediumList : MediumList
}