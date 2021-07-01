const Command = require('../../Structures/Command');
const { MessagEmbed, MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['say', 's'],
			description: 'Dm user',
			category: '__Moderation__',
			usage: ''
		});
	}

	async run(message, args) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('You dont have permission for this command.');
        if (!args[0]) return message.reply("Please specify message that bot should say.")
        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
	}
};
