module.exports = app => {
  app.use('/command', require('./routes/commands.js'));
  app.use('/secretCommand', require('./routes/secret_commands.js'));
  app.use('/groups', require('./routes/groups.js'));
  app.use('/login', require('./routes/login.js'))
}