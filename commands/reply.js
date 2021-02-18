const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'reply',
    description: "this is a reply command",
    
    execute(message, args, Client){
      const Discord = require('discord.js');
      const prefix = "!";
 

      if(!message.member.hasPermission('MANAGE_MESSAGES')){
          message.reply(`You don't have access to this command`)
          return;
      }
      const user = message.mentions.members.first() || Client.users.cache.get(args[1]);

      const modResponse = args.slice(2).join(" ");

      if(!user){
          message.channel.send(`${message.author.username}, You need to give the id of the user you want to reply to.\nCorrect usage of this command is !reply <userID> <Your Response>`)
          return;
      }
      if(!modResponse){
          message.channel.send(`${message.author.username}, You need to put what you want to reply with.\nCorrect usage of this command is !reply <userID> <Your Response>`)
          return;
      }

    const modResponseEmbed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`Response by ${message.author.username}`)
    .setDescription(`${modResponse}`)
    .setTimestamp()

  user.send(modResponseEmbed);

  message.react(`<a:Sent:811934900525203477>`)
  }
}