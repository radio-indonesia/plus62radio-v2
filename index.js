const { Client, Intents, Collection, WebhookClient } = require('discord.js');
const { token, prefix, webhookURL } = require('./src/botconfig/config');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const fs = require('fs').promises;
require('dotenv').config(); // Mengonfigurasi dotenv
const path = require('path');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// Objek untuk menyimpan informasi koneksi suara per server
const voiceConnections = new Map();

// Inisialisasi cache
const audioCache = new Map();

// Koleksi perintah
client.commands = new Collection();

(async () => {
  const commandFiles = await fs.readdir('./src/commands');

  for (const file of commandFiles) {
    if (file.endsWith('.js')) {
      const command = require(path.join(__dirname, 'src', 'commands', file));
      client.commands.set(command.name, command);
    }
  }
})();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Daftar aktivitas yang akan digunakan secara bergantian
  const activities = ["Radio FM & Fun", `prefix ${prefix}`];
  let currentActivityIndex = 0;

  // Fungsi untuk mengubah aktivitas
  function setNextActivity() {
    client.user.setActivity(activities[currentActivityIndex], { type: 'LISTENING' });
    currentActivityIndex = (currentActivityIndex + 1) % activities.length;
  }

  // Set aktivitas awal
  setNextActivity();

  // Mengubah aktivitas setiap 10 detik (sesuaikan sesuai kebutuhan)
  setInterval(setNextActivity, 10000); // Mengubah aktivitas setiap 10 detik
});


// Event handler untuk notifikasi undangan (bot diundang ke server)
client.on("guildCreate", async (guild) => {
  console.log(`Bot diundang ke server: ${guild.name} (ID: ${guild.id})`);
  
  // Mengirim notifikasi ke channel Discord melalui webhook
  const webhook = new WebhookClient({ url: webhookURL });
  const message = `Bot diundang ke server: ${guild.name} (ID: ${guild.id})`;
  await webhook.send(message);
});

// Event handler untuk notifikasi pengusiran (bot dikeluarkan dari server)
client.on("guildDelete", async (guild) => {
  console.log(`Bot dikeluarkan dari server: ${guild.name} (ID: ${guild.id})`);
  
  // Mengirim notifikasi ke channel Discord melalui webhook
  const webhook = new WebhookClient({ url: webhookURL });
  const message = `Bot dikeluarkan dari server: ${guild.name} (ID: ${guild.id})`;
  await webhook.send(message);
});

client.on("messageCreate", async (message) => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.reply(`:x: **Perintah '${commandName}' tidak ditemukan!**`);
    }

    command.execute(message, args, client);
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    message.reply(`:x: **Terjadi kesalahan: ${error.message}**`);
  }
});

client.login(token);

module.exports = {
  client,
  voiceConnections,
  audioCache,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
};
