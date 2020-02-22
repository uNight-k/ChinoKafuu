const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")

module.exports = class ServerBannerCommand extends Command {
    constructor(client) {
        super(client, {
            name: "serverbanner",
            aliases: ["guildbanner"],
            category: "util",
		ClientPermission: ["EMBED_LINKS"]
        })
    }

    run({ message, args, server }, t) {
        if (message.guild.premiumTier <= 1 || !message.guild.partnered || !message.guild.verified) return message.chinoReply("error", t("commands:no-premium"))
        if (!message.guild.banner) return message.chinoReply("error", t("commands:serverbanner.no-banner"))

        const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setDescription(t("commands:serverbanner.download", { download: message.guild.bannerURL({ size: 2048 }) }))
            .setImage(message.guild.bannerURL({ size: 2048 }))
        
        message.channel.send(embed)
    }
}