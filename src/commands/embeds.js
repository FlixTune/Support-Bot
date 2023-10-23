const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embeds")
    .setDescription("Embeds for channels in FlixTune Hometown")
    .addStringOption((opt) =>
      opt
        .setName("option")
        .setDescription("Pick which option you a want to do")
        .addChoices(
          {
            name: "Rules",
            value: "rules",
          },
          {
            name: "Informations",
            value: "informations",
          }
        )
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(i, client) {
    const embed = new EmbedBuilder();

    if (!i.member.roles.cache.has(config.roles.developer)) {
      embed
        .setColor(client.color)
        .setDescription(
          `${config.emojis.error} You must be apart of the developer team to access this command`
        );

      return i.reply({ embeds: [embed], ephemeral: true });
    }

    switch (i.options.getString("option")) {
      case "rules": {
        const channel = client.channels.cache.get(config.channels.rules);

        await i
          .reply({
            content: `${config.emojis.success} Rules have been sent to the ${channel} channel`,
            ephemeral: true,
          })
          .then(async () => {
            await channel
              .send({ content: "https://cdn.flixtune.xyz/img/FlixBanner.png" })
              .then(async () => {
                const RulesEmbed = new EmbedBuilder()
                  .setColor(client.color)
                  .setAuthor({
                    name: `${client.user.username} | Rules`,
                    iconURL: client.user.displayAvatarURL({ size: 4096 }),
                    url: config.links.website,
                  })
                  .setDescription(
                    [
                      `1. Do not mention the <@&${config.roles.developer}> in chat, this bothers them.`,
                      ``,
                      `2. Do not promote or share your Discord server links here.`,
                      `*${config.emojis.reply} This results in an immediate ban!*`,
                      ``,
                      `3. Do not discuss topics that create controversies such as politics and religions.`,
                      ``,
                      `4. Do not spread drama in this server, and discuss your personal issues privately.`,
                      `*${config.emojis.reply} We wish to see things clean and comfortable for everyone!*`,
                      ``,
                      `5. Do not go on talking about other Discord bots in this server.`,
                      `*${config.emojis.reply} This place is only meant for **FlixTune**!*`,
                      ``,
                      `6. Do not share any **NSFW**("Not Safe To Work") content here.`,
                      `*${config.emojis.reply} This includes pornographic or violent content. This is strictly prohibited!*`,
                      ``,
                      `7. Do not contact the staff privately to get help.`,
                      `*${config.emojis.reply} This is support server is not built as a decoration!*`,
                      ``,
                      `8. Repeating messages, images or mentions is not allowed in here.`,
                      `*${config.emojis.reply} It is considered as spam and results in getting muted!*`,
                      ``,
                      `9. Do not insult, offend, harass or target your fellow members.`,
                      `*${config.emojis.reply} Be friendly with everyone!*`,
                      ``,
                      `*Be careful when dealing with individuals that are not a part of **FlixTune's Offical Support Team**, we take away our responsibility to deal with them seriously.*`,
                      `### To ask for help use <#${config.channels.support}> channel.`,
                    ].join("\n")
                  );

                const row = new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setLabel("Website")
                    .setStyle(ButtonStyle.Link)
                    .setEmoji(config.emojis.website)
                    .setURL(config.links.website),
                  new ButtonBuilder()
                    .setLabel("Invite")
                    .setStyle(ButtonStyle.Link)
                    .setEmoji(config.emojis.invite)
                    .setURL(config.links.invite)
                );

                await channel.send({ embeds: [RulesEmbed], components: [row] });
              });
          });
        break;
      }

      case "informations": {
        const channel = client.channels.cache.get(config.channels.information);
        await i
          .reply({
            content: `${config.emojis.success} Informations have been sent to the ${channel} channel`,
            ephemeral: true,
          })
          .then(async () => {
            const infoEmbed = new EmbedBuilder()
              .setColor(client.color)
              .setTitle(
                `${config.emojis.flix} Welcome to FlixTune's Hometown ${config.emojis.flix}`
              )
              .setDescription(
                [
                  `* You don't have <@1165337532930736138> on your server yet? **https://invite.flixtune.xyz**`,
                  `* Do you want a invite your friend here? **https://support.flixtune.xyz**`,
                  `* How your data is used by FlixTune? **https://privacy.flixtune.xyz**`,
                  `* Check our ToS *(Terms of Service)* here: **https://tos.flixtune.xyz**`,
                  ``,
                  `Please follow our <#${config.channels.rules}> and [Discord's Community GuildLines](https://discord.com/guildlines), as well as some common sense at all times. This is the only Official Discord Server for <@1165337532930736138>. We never ask for your personal or billing information!`,
                ].join("\n")
              );

            await channel.send({ embeds: [infoEmbed] });
          });
        break;
      }
    }
  },
};
