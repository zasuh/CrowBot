const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

//Don't forget to delete the token if you are using a public repo!!!
client.login(token);

client.on('message', message => {
  if (message.content === `${prefix}pun`) {
    message.channel.send('What is a pirates favourite letter? Ayyy it be the sea!');
  } else if (message.content === `${prefix}time`) {
    let time = new Date();
    let hours = time.getHours;
    let minutes = time.getMinutes;
    message.channel.send('The current time is: ' + time.getHours + ':' + time.getMinutes);
  } else if (message.content === `${prefix}server`) {
    message.channel.send(`Server name: ${message.guild.name}
    \nTotal members: ${message.guild.memberCount}
    \nCreated: ${message.guild.createdAt}
    \nServer Region: ${message.guild.region}`);
  } else if (message.content === `${prefix}userinfo`) {
    message.channel.send(`Your username is: ${message.author.username}
    \nYour ID is: ${message.author.id}
    \nYou were created: ${message.author.createdAt}
    \nYour presence: ${message.author.presence.status}
    \nYour tag: ${message.author.tag}`);
  }
})

