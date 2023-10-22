const { readdir } = require("fs");

module.exports = async (client) => {
  readdir("./src/listeners", (err, files) => {
    if (err) return client.log.error(err);

    files.forEach((file) => {
      const listener = require(`../listeners/${file}`);
      let listenerName = file.split(".")[0];

      try {
        client.on(listenerName, listener.bind(null, client));
        client.log.event(`Loaded ${listenerName}.js listener`);
      } catch (e) {
        return client.log.error(e);
      }
    });
  });
};
