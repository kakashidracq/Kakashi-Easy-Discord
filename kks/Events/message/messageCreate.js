const Event = require('../../Structures/Event');
const PrefixSchema = require('../../Schema/PrefixSchema')
const mongodb = require('../../mongo')();
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	async run(message) {
		//this part is for message handling
		//if you want bot to send something without using prefix here
		if (message.content === 'hello') {
			message.reply('Hello Sir :)')
		}
		//like this you can make comands


		// Dont touch here
		let data = await PrefixSchema.findOne({
			_id: message.guild.id
		})
		let dprefix;
		if(data === null) {
			dprefix = this.client.prefix
		} else {
			dprefix = data.newPrefix;
		}

		//part where bot sends message when pinged or commands work with mention example @bot help
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

		if (message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);
		//Dont touch these
		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : dprefix;
		
		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {

			if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
				return message.reply('Sorry, this command can only be used by the bot owners.');
			}

			if (command.guildOnly && !message.guild) {
				return message.reply('Sorry, this command can only be used in a discord server.');
			}

			if (command.nsfw && !message.channel.nsfw) {
				return message.reply('Sorry, this command can only be ran in a NSFW marked channel.');
			}

			if (command.args && !args.length) {
				return message.reply(`Sorry, this command requires arguments to function. Usage: ${command.usage ?
					`${this.client.prefix + command.name} ${command.usage}` : 'This command doesn\'t have a usage format'}`);
			}
			
			if (message.guild) {
				const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
				if (userPermCheck) {
					const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
					if (missing.length) {
						const embed = new MessageEmbed()
							.setColor('RED')
							.setDescription(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions`)
						return message.reply({embeds: [embed]});
					}
				}

				const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
				if (botPermCheck) {
					const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
					if (missing.length) {
						const dembed = new MessageEmbed()
							.setColor('RED')
							.setDescription(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions`)
						return message.reply({embeds: [dembed]});
					}
				}
			}
			
			command.run(message, args);
		}
	}

};
