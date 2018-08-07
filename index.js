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
  }
  else if (message.content === `${prefix}time`) {
    let time = new Date();
    let hours = time.getHours;
    let minutes = time.getMinutes;
    message.channel.send('The current time is: ' + time.getHours + ':' + time.getMinutes);
  }
  else if (message.content === `${prefix}server`) {
    message.channel.send(`Server name: ${message.guild.name}
    \nTotal members: ${message.guild.memberCount}
    \nCreated: ${message.guild.createdAt}
    \nServer Region: ${message.guild.region}`);
  }
  else if (message.content === `${prefix}userinfo`) {
    message.channel.send(`Your username is: ${message.author.username}
    \nYour ID is: ${message.author.id}
    \nYou were created: ${message.author.createdAt}
    \nYour presence: ${message.author.presence.status}
    \nYour tag: ${message.author.tag}`);
  }
  else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any argument, ${message.author}!`);
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`First argument: ${args[0]}`);
  }
  else if (command === 'kick') {
    if (!message.mentions.users.size) {
      return message.reply('You need to tag a user in order to kick them!');
    }
    const targetUser = message.mentions.users.first();
    message.channel.send(`You wanted to kick?: ${targetUser.username}`);
  }
  else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.reply(`Your avatar: ${message.author.displayAvatarURL()}`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
    })

    message.channel.send(avatarList);
  }
  else if (command === 'prune') {
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply('That doesn\'t seem to be a valid number.');
    }
    else if (amount < 2 || amount > 100) {
      return message.reply('You need to input a number between 2 and 100.');
    }

    message.channel.bulkDelete(amount);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
})

