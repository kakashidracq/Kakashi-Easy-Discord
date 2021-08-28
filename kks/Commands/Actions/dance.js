const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const anime = require('anime-actions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['dance'],
			description: `Blush`,
			category: '__Actions__',
            botPerms: ['EMBED_LINKS'],
            usage: '',
			guildOnly: true
		});
	}

	async run(message, args) {
        try{
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username} is angry..`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#03fcf8')
                .setImage(await anime.dance())
            message.reply({ embeds: [embed] });
        } catch(e) {
            return;
        }
    }
}