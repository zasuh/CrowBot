module.exports = {
  name: 'user-info',
  execute(message, args) {
    message.channel.send(`Your username is: ${message.author.username}
    \nYour ID is: ${message.author.id}
    \nYou were created: ${message.author.createdAt}
    \nYour presence: ${message.author.presence.status}
    \nYour tag: ${message.author.tag}`);
  }
};