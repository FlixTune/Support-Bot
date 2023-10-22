const config = require("../../config");

module.exports = async (client, data) => {
  if (config.status === "PRODUCTION") {
    client.log.debug(data);
  }
};
