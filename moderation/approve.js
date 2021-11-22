var Discord = require('discord.js');

module.exports = {
    name: 'approve',
    permission: 1,
    main: async function (bot, msg) {
        const rules = bot.emojis.cache.find(emoji => emoji.name == "rules").toString();
        var channel = msg.guild.channels.cache.get(bot.config.welcomeChannel); //mod channel
        var log = msg.guild.channels.cache.get(bot.config.logChannel);  //logs the stuff

        var userID = msg.content.split(' ').splice(0)[0];

        //get user by id
        console.log(userID);
        const target = msg.guild.members.cache.get(userID);
        console.log(target.toString())
        //const target = msg.mentions.members.first(); <-- by mention
        
        //member id: 909989200378601472
        //untrusted id: 909988798308433920

        if (msg.channel.id == bot.config.welcomeChannel) {
            if (target != null) {
                if (!target.roles.cache.some(role => role.id === '909989200378601472') && target.roles.cache.some(role => role.id === '909988798308433920')) {
                    var logEmbed = new Discord.MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.avatarURL())
                        .addField('Member approved:', rules + ` **${target} (${target.id}) was approved.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL())
                        .setTimestamp()
                        .setColor(3447003);

                    await target.roles.add('909989200378601472');
                    await target.roles.remove('909988798308433920')
                    await channel.send({
                        embed: logEmbed
                    })
                    await log.send({
                        embed: logEmbed
                    })
                } else {
                    msg.reply('this user has already been approved!');
                }
            } else {
                msg.reply("mention the target! Usage: `!approve [@user]`");
            }
        } else {
            msg.reply("wrong channel!");
        }
    }
}