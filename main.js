require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Logger } = require("term-logger");
const config = require("./config");
console.clear();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: true,
  },
});

client.log = Logger;
client.commands = new Collection();
client.color = config.colors.default;

(async () => {
  require("./src/loaders/Listener")(client);
})();

process.on("uncaughtException", (e) => Logger.error(e));
process.on("unhandledRejection", (e) => Logger.error(e));

client.login(process.env.CLIENT_TOKEN).catch((e) => {
  return Logger.error(e);
});
