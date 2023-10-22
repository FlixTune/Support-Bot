const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  require("../loaders/Command")(client);

  setInterval(() => {
    client.user.setActivity({
      type: ActivityType.Custom,
      name: `FlixTune`,
      state: `flixtune.xyz`,
    });
  }, 30000);

  client.log.ready(`Logged in as ${client.user.username}`);
};
