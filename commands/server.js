module.exports = {
  name: 'server',
  execute(message, args) {
    message.channel.send(`Server name: ${message.guild.name}
    \nTotal members: ${message.guild.memberCount}
    \nCreated: ${message.guild.createdAt}
    \nServer Region: ${message.guild.region}`);
  }
};