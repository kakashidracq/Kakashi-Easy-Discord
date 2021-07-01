const Command = require('../../Structures/Command');
const { MessagEmbed, MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ping'],
			description: 'Shows the ping of bot',
			category: '__General__',
			usage: ''
		});
	}

	async run(message) {
		const members = message.guild.members.cache;
		const Pembed = new MessageEmbed()
			.setAuthor(`Total Members`)
			.setColor('GREEN')
			.setDescription(`Total ${message.guild.memberCount} members
__**Online**__ : ${members.filter(member => member.presence.status === 'online').size}
__**DnD**__ : ${members.filter(member => member.presence.status === 'dnd').size}
__**Idle**__ : ${members.filter(member => member.presence.status === 'idle').size}`)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter('KAKASHI#3709').setTimestamp();
		message.channel.send(Pembed)
	}
};
