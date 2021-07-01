const Command = require('../../Structures/Command');
const { MessagEmbed, MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['av', 'avatar'],
			description: 'Shows avatar of your or mentioned user',
			category: '__General__',
			usage: '<@user>'
		});
	}

	async run(message) {
		let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 4096, dynamic: true})
        message.channel.send(avatar)
	}
};
