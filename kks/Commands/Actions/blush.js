const Command = require('../../Structures/Command');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const anime = require('anime-actions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['blush'],
			description: `Blush`,
			category: '__Actions__',
            botPerms: ['EMBED_LINKS'],
            usage: '',
			guildOnly: true
		});
	}

	async run(message, args) {
        try{
            const choices = ['blushes...', 'blushes oh my...', 'blush blush..'];
            const responses = choices[Math.floor(Math.random() * choices.length)];
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username} ${responses}`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#03fcf8')
                .setImage(await anime.blush())
            message.reply({ embeds: [embed] });
        } catch(e) {
            return;
        }
    }
}