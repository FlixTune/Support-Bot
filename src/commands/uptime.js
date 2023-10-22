const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Show's the bot's current uptime")
    .setDMPermission(false),

  async execute(i, client) {
    const uptime = Math.floor((Date.now() / 1000) | 0) - Math.floor(client.uptime / 1000);

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({
        name: `${client.user.username} | Uptime`,
        iconURL: client.user.displayAvatarURL({ size: 4096 }),
        url: config.links.website,
      })
      .setDescription(`${config.emojis.clock} Bot started <t:${uptime}:R> (<t:${uptime}:F>)`);

    return i.reply({ embeds: [embed] });
  },
};
