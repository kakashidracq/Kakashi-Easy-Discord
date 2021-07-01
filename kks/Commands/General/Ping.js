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
		const latency = message.createdTimestamp - message.createdTimestamp;
		const Pembed = new MessageEmbed()
			.setTitle(`${this.client.user.username}`)
			.setColor('GREEN')
			.setDescription(`__**Bot Latency**__
\`${latency}ms\`

__**Api Latency**__
\`${Math.round(this.client.ws.ping)}ms\``)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter('KAKASHI#3709').setTimestamp();
		message.channel.send(Pembed)
	}
};
