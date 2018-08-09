module.exports = {
  name: 'react',
  aliases: ['emoji'],
  cooldown: 5,
  description: 'Reacts to the message with an emoji.',
  execute(message, args) {
      message.react('😄');
      message.react('🍎');
      message.react('🍊');
      message.react('🍇');
  }
  // To add custom emojis you need the emoji unicode
};