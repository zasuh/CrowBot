const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

//Don't forget to delete the token if you are using a public repo!!!
client.login('');

client.on('message', message => {
  if (message.content === '!pun') {
    message.channel.send('What is a pirates favourite letter? Ayyy it be the sea!');
  }
})

