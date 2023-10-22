const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Run a code with this command")
    .addStringOption((opt) =>
      opt.setName("code").setDescription("The code you want to run").setRequired(true)
    )
    .setDMPermission(false),

  async execute(i, client) {
    const content = i.options.getString("code");
    var sensitiveInfoRegex = /client\.token/gi;
    const embed = new EmbedBuilder();

    if (!i.member.roles.cache.has(config.roles.developer)) {
      embed
        .setColor(client.color)
        .setDescription(
          `${config.emojis.error} You must be apart of the developer team to access this command`
        );

      return i.reply({ embeds: [embed], ephemeral: true });
    }

    if (sensitiveInfoRegex.test(content)) {
      embed
        .setColor(client.color)
        .setDescription(
          `${config.emojis.error} Cannot execute code containing sensitive information`
        );

      return i.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      let code = await eval(content);

      if (typeof output !== "string") {
        code = require("util").inspect(code, { depth: 0 });
      }

      return i.reply({ content: `\`\`\`js\n${code.slice(0, 2000)}\n\`\`\``, ephemeral: true });
    } catch (e) {
      return i.reply({ content: `\`\`\`js\n${e.message.slice(0, 2000)}\n\`\`\``, ephemeral: true });
    }
  },
};
