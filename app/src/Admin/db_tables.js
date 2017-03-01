var tables = [
{
  "table" : "Commands",
  "columns" : [
    "name", "userId", "groupId", "messageId", "verified", "status"
  ] 
},
{
  "table" : "GroupRecipients",
  "columns" : [
    "groupId", "recipientId"
  ] 
},
{
  "table" : "Groups",
  "columns" : [
    "name", "userId", "mediumType"
  ] 
},
{
  "table" : "Messages",
  "columns" : [
    "text", "additionalContent", "count", "commandId"
  ] 
},
{
  "table" : "Recipients",
  "columns" : [
    "name", "contactInfo", "mediumType", "userId"
  ] 
},
{
  "table" : "SecretCommands",
  "columns" : [
    "triggerId", "userId", "groupId", "secretMessageId", "responseId", "verified", "status"
  ] 
},
{
  "table" : "SecretMessages",
  "columns" : [
    "text", "additionalContent", "count", "secretCommandId"
  ] 
},
{
  "table" : "SecretResponses",
  "columns" : [
    "speech", "count", "secretCommandId"
  ] 
},
{
  "table" : "SecretTriggers",
  "columns" : [
    "name", "count"
  ] 
},
{
  "table" : "TriggeredCommands",
  "columns" : [
    "commandId", "userId"
  ] 
},
{
  "table" : "TriggeredSecrets",
  "columns" : [
    "SecretCommandId", "userId"
  ] 
},
{
  "table" : "Users",
  "columns" : [
    "email", "name"
  ] 
}
]

export default tables