const { MessageEmbed } = require('discord.js');
const PrefixSchema = require('../../Schema/PrefixSchema');
const Command = require('../../Structures/Command.js');



module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['prefix'],
            description: 'Change server prefix',
            category: '__Moderation__',
            usage: `<newprefix>`,
            botPerms: ['EMBED_LINKS'],
            userPerms: ['MANAGE_GUILD'],
            guildOnly: true
		});
	}
	async run(message, args) {
    const newprefix = args[0];
    const pprefix = new MessageEmbed()
        .setTitle('<a:DG_cross:847875140833902612>  __Error__')
        .setColor('RED')
		.setDescription('```Pls provide a new prefix```')
		.setFooter('©2021 〢KAKASHI 〢', this.client.user.displayAvatarURL({ foramt: 'png' }));
    if(!newprefix) return message.channel.send(pprefix)
    const mprefix = new MessageEmbed()
        .setTitle('<a:DG_cross:847875140833902612>  __Error__')
        .setColor('RED')
		.setDescription('```You can only have 5 characters max as new prefix```')
		.setFooter('©2021 〢KAKASHI 〢', this.client.user.displayAvatarURL({ foramt: 'png' }));
    if(newprefix.length > 5) return message.channel.send(mprefix)
    const nprefix = new MessageEmbed()
        .setTitle('<a:DG_white_ver:765887166282727445>  __Sucess__')
        .setColor('GREEN')
		.setDescription(`\`\`\`\Prefix has been set to ${newprefix}\`\`\``)
		.setFooter('©2021 〢KAKASHI 〢', this.client.user.displayAvatarURL({ foramt: 'png' }));
    const ddprefix = this.client.prefix;
    const resetprefix = new MessageEmbed()
        .setTitle('<a:DG_white_ver:765887166282727445>  __Sucess__')
        .setColor('GREEN')
		.setDescription(`\`\`\`\Prefix has been cleared to default prefix which is ${ddprefix}\`\`\``)
		.setFooter('©2021 〢KAKASHI 〢', this.client.user.displayAvatarURL({ foramt: 'png' }));

    let data;
    try {
        data = await PrefixSchema.findOne({
            _id: message.guild.id
        });
        if(newprefix === 'reset') {
            await PrefixSchema.findOneAndRemove({
                _id: message.guild.id,
            })
            return message.reply({embeds: [resetprefix]})
        }
        if(newprefix === ddprefix) {
            await PrefixSchema.findOneAndRemove({
                _id: message.guild.id,
            })
            return message.reply({embeds: [resetprefix]})
        }
        if(!data) {
            let newdata = await PrefixSchema.create({
                _id: message.guild.id,
                newPrefix: newprefix
            })
            newdata.save()
        } else {
            await PrefixSchema.findOneAndRemove({
                _id: message.guild.id,
            })
            let ok = await PrefixSchema.create({
                _id: message.guild.id,
                newPrefix: newprefix
            })
            ok.save()
        }
        return message.reply({embeds: [nprefix]})
    } catch (err) {
        return;
    }
}

};