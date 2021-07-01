const { MessageEmbed } = require('discord.js');
const Event = require('../../Structures/Event');

module.exports = class extends Event {

	async run(message) {
        //part when member joins server
        this.client.on('guildMemberAdd', async member => {
            const channel = member.guild.channels.cache.find(ch => ch.topic === 'welcome-here'); 
            //finding channels having topic 'welcome-here' in channel topic if you want to change this part to channel name then just edit ch => ch.id to ch => ch.name
            if (!channel) return;
            //if channel not found ignore rest of code :)
            const welcomeembed = new MessageEmbed()
                .setTitle(`__**Welcome**__`) 
                .setThumbnail(member.guild.iconURL({dynamic : true}))
                .setDescription(`Welcome ${member} to ${member.guild.name} Hope you enjoy here :)`)
                //You can set this part as you want
                .setFooter('KAKASHI#3709').setTimestamp()
            channel.send(`${member}`, welcomeembed)
            //remove the `${member}`, if you dont want th bot to mention member
        })
        //part when member leaves server
        this.client.on('guildMemberRemove', async member => {
            const channel = member.guild.channels.cache.find(ch => ch.topic === 'member-leave'); 
            //finding channels having topic 'welcome-here' in channel topic if you want to change this part to channel name then just edit ch => ch.id to ch => ch.name
            if (!channel) return;
            //if channel not found ignore rest of code :)
            const leaveembed = new MessageEmbed()
                .setTitle(`__**Good Bye**__`) 
                .setThumbnail(member.guild.iconURL({dynamic : true}))
                .setDescription(`GoodBye ${member} Hope you enjoyed here :)`)
                //You can set this part as you want
                .setFooter('KAKASHI#3709').setTimestamp()
            channel.send(leaveembed)
            //remove the `${member}`, if you dont want th bot to mention member
        })
        //part when bot joins new server it sends message to the server
        this.client.on('guildCreate', (guild) => {
            const mchannel = guild.channels.cache.find(
                (channel) =>
                    channel.type === 'text' &&
                    channel.permissionsFor(guild.me).has('SEND_MESSAGES')
            );
        
            mchannel.send('Thanks for adding me to your server');
        })
    }
}