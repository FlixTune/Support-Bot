const { EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = async (client, i) => {
  const embed = new EmbedBuilder();

  if (config.status === "PRODUCTION") {
    client.log.debug(`Command /${i.commandName} executed by ${i.user.username} (${i.user.id})`);
  }

  const command = client.commands.get(i.commandName);
  if (!command) return;

  try {
    command.execute(i, client).catch((e) => {
      client.log.error(e);

      embed
        .setColor(client.color)
        .setAuthor({
          name: `${client.user.username} | Error`,
          iconURL: client.user.displayAvatarURL({ size: 4096 }),
          url: config.links.website,
        })
        .setDescription(
          `${config.emojis.error} An error occurred while executing \`/${i.commandName}\` command`
        );

      return i.reply({ embeds: [embed], ephemeral: true });
    });
  } catch (e) {
    return client.log.error(e);
  }
};
