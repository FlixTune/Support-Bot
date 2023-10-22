const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");
const config = require("../../config");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = async (client) => {
  const commands = [];
  const commandsDir = join(__dirname, "../../src/commands/");
  const commandFiles = readdirSync(commandsDir).filter((f) => f.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(join(commandsDir, file));

    commands.push(command.data);
    client.commands.set(command.data.name, command);
    client.log.command(`Loaded ${command.data.name}.js command`);
  }

  const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN);

  (async () => {
    try {
      await rest.put(Routes.applicationGuildCommands(client.user.id, config.guildId), {
        body: commands,
      });

      client.log.info(`Successfully loaded [ / ] commands locally`);
    } catch (e) {
      return client.log.error(e);
    }
  })();
};
