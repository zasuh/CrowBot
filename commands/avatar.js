module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pfp'],
  cooldown: 5,
  description: 'Shows user avatar',
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply(`Your avatar: ${message.author.displayAvatarURL()}`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
    })

    message.channel.send(avatarList);
  },
};