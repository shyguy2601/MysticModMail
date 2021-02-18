module.exports = {
    name: 'help',
    description: "this is a help command",
    execute(message, args){
      const Discord = require('discord.js');
  
    const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Help')
    .setDescription('Commands')
    .addField('Reply', 'Reply to the modmail message', true)
    .addField('Usage: ', `!reply <userID> <Your Response>`, true)
    .addField(`\u200B`,`\u200B`)
    .addField('Help', 'Brings up this embed', true)
    .addField('Usage: ', '<help', true)

  message.channel.send(HelpEmbed);
  }
}