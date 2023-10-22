const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("steal")
    .setDescription("Steal Emoji Feature")
    .addSubcommand((sub) =>
      sub
        .setName("emoji")
        .setDescription("Adds a given emoji to the FlixTune's server")
        .addStringOption((opt) =>
          opt
            .setName("emoji")
            .setDescription("The emoji you would like to add to the server")
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt.setName("name").setDescription("Name for the emoji").setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(i, client) {
    const embed = new EmbedBuilder();

    switch (i.options.getSubcommand()) {
      case "emoji": {
        let emoji = i.options.getString("emoji")?.trim();
        let name = i.options.getString("name");

        if (emoji.startsWith("<") && emoji.endsWith(">")) {
          const id = emoji.match(/\d{15,}/g)[0];

          const type = await axios
            .get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then((img) => {
              if (img) {
                return "gif";
              } else {
                return "png";
              }
            })
            .catch((e) => {
              return "png";
            });

          emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`;
        }

        if (!emoji.startsWith("http") && !emoji.startsWith("https")) {
          embed
            .setColor(client.color)
            .setDescription(`${config.emojis.error} You cannot steal default emojis!`);

          return i.reply({ embeds: [embed], ephemeral: true });
        }

        await i.guild.emojis
          .create({ attachment: emoji, name: name })
          .then((emoji) => {
            embed
              .setColor(client.color)
              .setAuthor({
                name: `${client.user.username} | Steal Emoji`,
                iconURL: client.user.displayAvatarURL({ size: 4096 }),
                url: config.links.website,
              })
              .setDescription(
                `${config.emojis.success} New emoji successfully added to **${i.guild.name}**`
              )
              .setFields(
                {
                  name: `Emoji`,
                  value: `${emoji}`,
                  inline: true,
                },
                {
                  name: `Name`,
                  value: `${emoji?.name}`,
                  inline: true,
                },
                {
                  name: `ID`,
                  value: `${emoji?.id}`,
                  inline: true,
                }
              );

            return i.reply({ embeds: [embed] });
          })
          .catch((e) => {
            embed.setColor(client.color).setDescription(`${config.emojis.error} ${e.message}`);

            return i.reply({ embeds: [embed], content: `\`\`\`${e.stack}\`\`\``, ephemeral: true });
          });
        break;
      }
    }
  },
};
