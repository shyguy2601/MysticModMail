'use strict';
process.on('uncaughtException', function (err) {
    console.log(`Caught exception:  ${err}`);
});
const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = "<";
const fs = require('fs');


Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);

}


Client.once('ready', async () => {
    console.log('Online!')

    const activities_list = [ 
        { text: "<help", type: 2},
        { text: "DM For help", type: 0},
        { text: "My DMs", type: 3},
        { text: "Developed by ShyGuy#5504", type: 0},
      ]
      
        let i = 0;
        
        setInterval(() => {
          if (i >= activities_list.length)  i = 0; 
          Client.user.setPresence({ activity: { name: activities_list[i].text, type: activities_list[i].type } });
          i++; 
      }, 10000);
})

Client.on('message', async (message) => {
    if(message.author.bot){
        return;
    }
    const msg = message.content;
    const msgAuthor = message.author.username;
    const msgAuthorDiscrim = message.author.discriminator;

    const embed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('ModMail')
    .setDescription(`Message from ${msgAuthor}` + `#` + `${msgAuthorDiscrim}`)
    .setAuthor(`User ID: ${message.author.id}`)
    .addField(`Message:`, msg)
    .addField(`\u200B`, `\`\`\`\nTo reply to this modmail message, type <reply ${message.author.id} <your response>\`\`\``)
    .setFooter(`React with ❌ to close this conversation`)
    .setTimestamp()
    if(message.channel.type == "dm") {
        const successEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle("Success!")
        .setDescription('Your message was sent to the staff team. Please wait, a member of staff will be with you soon')
        .addField('Your message:- ', msg)
        .setTimestamp()
        message.reply(successEmbed)

        Client.channels.cache.get('811959489565556757').send(embed).catch(err => console.log(err))
        .then((embed) => {
            embed.react('❌').then(() => {
                const filter = (reaction, user) => {
                     return ['❌'].includes(reaction.emoji.name)
                }
                  const collector = embed.createReactionCollector(filter)
            collector.on('collect', async (reaction, user) => {       
                if(reaction.emoji.name === '❌'){
                    const closed = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle('ModMail')
                    .setDescription(`Message from ${msgAuthor}` + `#` + `${msgAuthorDiscrim}`)
                    .addField(`Message:`, `${msg}`)
                    .setFooter(`This conversation has been closed`)
                    .setTimestamp()

                    embed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))
                    embed.edit(closed);

                    const closedDM = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle('Thank You!')
                    .setDescription('This conversation has now been closed, send another message if you have more issues/concerns')
                    .setFooter('Closed')
                    .setTimestamp()

                    message.channel.send(closedDM);
                    return;
                }
            }) 

         })
        })
    }
    
    

    if(!message.content.startsWith(`${prefix}`)) return;
    if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    
    const commandName = args[0].slice(prefix.length).toLowerCase();
    const command = Client.commands.get(commandName) || Client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
    if(!command) return;

        try {
            command.execute(message, args, Client);
        } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command');
        }
    

})


Client.login(process.env.TOKEN)