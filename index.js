const fs = require('fs'); //Native Node file system
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  //set a new item in the Collection
  //with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready!');
});

//Need to add args-info, avatar, kick and prune commands to "command folder"
//Don't forget to delete the token if you are using a public repo!!!
client.login(token);

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase;

  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  }
  else if (command === 'react') {
    client.commands.get('react').execute(message, args);
  }
  else if (command === `pun`) {
    client.command.get('puns').execute(message, args);
  }
  else if (message.content === `${prefix}time`) {
    let time = new Date();
    let hours = time.getHours;
    let minutes = time.getMinutes;
    message.channel.send('The current time is: ' + time.getHours + ':' + time.getMinutes);
  }
  else if (command === `server`) {
    client.command.get('server').execute(message, args);
  }
  else if (message.content === `${prefix}userinfo`) {
    message.channel.send(`Your username is: ${message.author.username}
    \nYour ID is: ${message.author.id}
    \nYou were created: ${message.author.createdAt}
    \nYour presence: ${message.author.presence.status}
    \nYour tag: ${message.author.tag}`);
  }
  else if (command === 'args-info') {
    client.command.get('args-info').execute(message, args);
  }
  else if (command === 'kick') {
    client.command.get('kick').execute(message, args);
  }
  else if (command === 'avatar') {
    client.command.get('avatar').execute(message, args);
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

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if(!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before reuse`);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command');
  }
});

client.login(token);

