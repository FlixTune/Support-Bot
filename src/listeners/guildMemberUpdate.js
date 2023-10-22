const { EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = async (client, oldMember, newMember) => {
  if (!oldMember.premiumSince && newMember.premiumSince) {
    const channel = newMember.guild.channels.cache.get(config.channels.chat);

    const embed = new EmbedBuilder()
      .setColor("#FF73FA")
      .setAuthor({
        name: `${newMember.user.username} has boosted the server!`,
        iconURL: `https://cdn.discordapp.com/emojis/1165777348411543682.webp?size=96&quality=lossless`,
      })
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setDescription(
        [
          `<@${newMember.user.id}> has boosted **${newMember.guild.name}** server!`,
          `We now have \`${newMember.guild.premiumSubscriptionCount}\` boosts!`,
        ].join("\n")
      );

    await channel.send({ embeds: [embed], content: `<@975898528859697182>` });
  }
};
