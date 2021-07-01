const { MessageEmbed } = require('discord.js')

module.exports = (client, message, track) => {
    const Kembed = new MessageEmbed()
        .setTitle('Playing')
        .setColor('GREEN')
        .setDescription(`**${track.title}**`)
        .setFooter(`KAKASHI#3709`, client.user.displayAvatarURL())
    message.channel.send(Kembed);

};