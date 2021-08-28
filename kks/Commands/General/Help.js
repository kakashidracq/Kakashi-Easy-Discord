const Command = require('../../Structures/Command');
const PrefixSchema = require('../../Schema/PrefixSchema');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['h', 'help'],
			description: 'Displays all the commands in the bot',
			category: '__General__',
			botPerms: ['EMBED_LINKS'],
			usage: '[command]'
		});
	}

	async run(message, [command]) {
		try{
			let prefix;
			let data = await PrefixSchema.findOne({
				_id: message.guild.id
			})
			if(data === null) {
				prefix = this.client.prefix;
			} else {
				prefix = data.newPrefix;
			}
			const embed = new MessageEmbed()
				.setColor('#cc33ff')
				.setAuthor(`${this.client.user.username} Help Menu`)
				.setImage(`https://media.discordapp.net/attachments/750334021342461992/876692954247475211/20210816_104659.jpg`)
				.setTimestamp();
				if (command) {
					const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
		
					if (!cmd) return message.channel.send(`There is no such command  named as \`${command}\``);
		
					const ssd = cmd.aliases.length ? cmd.aliases.map(alias => `${alias}`).join(' | ') : 'No Aliases'
					embed.setAuthor(`Command Help`, this.client.user.displayAvatarURL());
					embed.setDescription(
`__**${this.client.utils.capitalise(cmd.name)}**__
**Aliases:** \`\`\`${ssd}\`\`\`
**Description:** \`\`\`${cmd.description}\`\`\`
**Usage:** \`\`\`${cmd.usage}\`\`\`
[**If you need support, found bugs? Join us now!**](https://discord.gg/c9Z8Sb2JJz)`
				);
					embed.setColor('#cc33ff')
					return message.channel.send({embeds: [embed]})
				} else {
					embed.setDescription(`My prefix here is \`${prefix}\`<a:BETA_PIKACHU:864853216399458306>
	[Support Server](https://discord.gg/c9Z8Sb2JJz)`
					);
					let categories;
					if (!this.client.owners.includes(message.author.id)) {
						categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== '<:BETA_GOLI_KHANXAS:873761468754038814>__Owner__').map(cmd => cmd.category));
					} else {
						categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== '<:BETA_GOLI_KHANXAS:873761468754038814>__Owner__').map(cmd => cmd.category));
					}
		
					for (const category of categories) {
						const dmd = this.client.commands.filter(cmd =>
							cmd.category === category).map(cmd => `${cmd.name}`).join(' │ ')
						embed.addField(`**${this.client.utils.capitalise(category)}**`, `\`${dmd}\``)
					}
					return message.channel.send({embeds: [embed]})
				}
		} catch(e) {
			console.log(e)
		}
	}

};