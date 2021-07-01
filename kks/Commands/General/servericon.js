const Command = require('../../Structures/Command');
const { MessagEmbed, MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['si', 'server', 'sicon'],
			description: 'Shows server icon',
			category: '__General__',
			usage: ''
		});
	}

	async run(message) {
		const avatar = message.guild.iconURL({size: 4096, dynamic : true});
		const banner = message.guild.bannerURL({size: 1024});
		if (banner) {
			message.channel.send(avatar, banner)
		}
		if (!banner) {
			message.channel.send(avatar)
		}
	}
};
