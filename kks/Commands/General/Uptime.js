const Command = require('../../Structures/Command');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ut'],
			description: 'Shows uptime of the bot.',
			category: '__General__'
		});
	}

	async run(message) {
		const uembed = new MessageEmbed()
			.setAuthor(`My Uptime`)
			.setColor('RED')
			.setDescription(`__**UPTIME**__
\`${ms(this.client.uptime, { long: true })}\`
`)
		message.channel.send(uembed);
	}

};
