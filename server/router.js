module.exports = app => {
  app.use('/command', require('./routes/commands.js'));
  app.use('/secretCommand', require('./routes/secret_commands.js'));
  app.use('/groups', require('./routes/groups.js'));
  app.use('/auth', require('./routes/auth.js'));
  app.use('/admin', require('./routes/admin.js'));
  app.use('/slack', require('./routes/slack.js'));
}