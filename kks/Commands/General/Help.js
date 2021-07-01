const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const thumb = 'https://images-ext-2.discordapp.net/external/YntZ9ck6iXovWvReHr2qPncB-phhguLeN8Ec0acXYjk/https/media.discordapp.net/attachments/750334021342461992/858758627069394975/kakashi_1.jpg?width=840&height=473';

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['h'],
			description: 'Displays commands',
			category: '__General__',
			usage: '[command]'
		});
	}

	async run(message, [command]) {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`Help Menu`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setImage(thumb)
			.setFooter(`KAKASHI#3709`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(`Invalid Command named. \`${command}\``);

			embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
			embed.setDescription([
				`**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
				`**❯ Description:** ${cmd.description}`,
				`**❯ Category:** ${cmd.category}`,
				`**❯ Usage:** ${cmd.usage}`
			])
			embed.setImage(thumb);
			return message.channel.send(embed);
		} else {
			embed.setDescription([
				`These are the available commands for ${message.guild.name}. The bot's prefix is: ${this.client.prefix}`,
			]);
			let categories;
			if (!this.client.owners.includes(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			}
			return message.channel.send(embed);
		}
	}

};
