const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../Structures/Command');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['info', 'bot'],
			description: 'Displays information about the bot.',
			category: 'Information'
		});
	}

	run(message) {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(this.client.user.displayAvatarURL())
			.setTitle(`✤〢BOT INFO`, this.client.user.displayAvatarURL())
			.setColor('BLUE')
			.addField('Details', [
				`**├〢 Client:** \`${this.client.user.tag}\``,
				`**├〢 Commands:** \`${this.client.commands.size}\``,
				`**├〢 Servers:** \`${this.client.guilds.cache.size.toLocaleString()}\` `,
				`**├〢 Users:** \`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``,
				`**├〢 Creation Date:** \`${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}\``,
				`**├〢 Discord.js:** \`v${djsversion}\``,
				`**├〢 Memory:**`,
				`\u3000 Total: \`${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}\``,
				`\u3000 Used: \`${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}\``,
				'\u200b'
			])
			.setImage('https://media.discordapp.net/attachments/854822247242792960/859740148896104458/bot-info-logo.png')
			.setFooter(`KAKASHI#3709`, ).setTimestamp();
			message.channel.send(embed)
	}

};
