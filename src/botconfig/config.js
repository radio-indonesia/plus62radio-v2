require('dotenv').config(); // Mengonfigurasi dotenv

module.exports = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    ownerId: process.env.OWNERID,
    clientId: process.env.CLIENTID,
    guildId: process.env.GUILDID,
    webhookURL: process.env.WEBHOOKURL,
    mongodbURI: process.env.MONGODB_URL,
    topggToken: process.env.TOKEN_TOPGG,
    port: process.env.PORT
};
