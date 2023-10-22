const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { WelcomeLeave } = require("canvafy");
const config = require("../../config");

module.exports = async (client, member) => {
  const channel = client.channels.cache.get(config.channels.welcome);
  if (member.user.bot) return;

  const welcome = await new WelcomeLeave()
    .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", "https://cdn.flixtune.xyz/img/welcomeBanner.png")
    .setTitle("Welcome")
    .setDescription(`We now have ${member.guild.memberCount} members!`)
    .setBorder("#f51926")
    .setAvatarBorder("#ffffff")
    .build();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Server Rules")
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.emojis.rules)
      .setURL("https://discord.com/channels/1165348048340258968/1165357473360793610"),
    new ButtonBuilder()
      .setLabel("Information")
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.emojis.update)
      .setURL("https://discord.com/channels/1165348048340258968/1165358428676436048")
  );

  channel.send({
    content: `${config.emojis.wave} Hello, <@${member.user.id}>!`,
    components: [row],
    files: [
      {
        attachment: welcome,
        name: `welcome-${member.user.id}.png`,
      },
    ],
  });
};
